'''
Author: ckdfs 2459317008@qq.com
Date: 2024-06-06 02:20:27
LastEditors: ckdfs 2459317008@qq.com
LastEditTime: 2024-06-15 07:55:45
FilePath: \agricultural-big-data\python\main.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import sqlite3
import paho.mqtt.client as mqtt
import json

app = Flask(__name__)
CORS(app)  # 启用CORS
socketio = SocketIO(app, cors_allowed_origins="*")  # 初始化SocketIO

# MQTT设置
MQTT_BROKER = "49.235.106.143"
MQTT_PORT = 1883
MQTT_TOPIC = "hello"
MQTT_TOPIC2 = "relay"

relay_status = {}

# 当接收到服务器响应订阅请求时的回调
def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed with QoS: " + str(granted_qos))

# 当接收到服务器推送的消息时的回调
def on_message(client, userdata, msg):
    print("Received data: " + msg.payload.decode())
    topic = msg.topic
    data = json.loads(msg.payload)  # 假设消息是JSON格式
    
    if topic == MQTT_TOPIC2 and data.get("action") == "ans":
        # 更新全局变量relay_status
        global relay_status
        relay_status = data
        # 可以选择在这里通过WebSocket广播relay_status
        socketio.emit('relay_status', relay_status)
        print(relay_status)
    elif topic == MQTT_TOPIC:
        # 处理其他消息
        store_data(data)
        # 通过WebSocket广播环境信息
        socketio.emit('environment_data', data)

# 将数据存储到数据库
def store_data(data):
    try:
        conn = sqlite3.connect('environment.db')
        print("Connected to database successfully")
        c = conn.cursor()
        c.execute('''INSERT INTO environment_data (temperature, humidity, light_intensity, CO2_concentration, soil_temperature, soil_humidity, soil_PH, soil_conductivity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', (
            data['temperature'],
            data['humidity'],
            data['lightIntensity'],
            data['co2Concentration'],
            data['soilTemperature'],
            data['soilHumidity'],
            data['soilPH'],
            data['soilConductivity']
        ))
        conn.commit()
        print("Data stored to database: " + str(data))
    except sqlite3.Error as e:
        print("Database error: ", e)
    except Exception as e:
        print("Exception in _query: ", e)
    finally:
        conn.close()

# 创建一个MQTT客户端
client = mqtt.Client()
client.on_subscribe = on_subscribe
client.on_message = on_message
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.subscribe(MQTT_TOPIC, qos=1)
client.subscribe(MQTT_TOPIC2, qos=1)
client.loop_start()

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # 发送最新的环境信息给刚连接的客户端
    data = get_latest_data()
    emit('environment_data', data)
    
    # 向MQTT的relay主题发送ask命令
    client.publish(MQTT_TOPIC2, json.dumps({"action": "ask"}))

def get_latest_data():
    # 从数据库获取最新的环境信息
    try:
        conn = sqlite3.connect('environment.db')
        c = conn.cursor()
        c.execute('''SELECT temperature, humidity, light_intensity, CO2_concentration, soil_temperature, soil_humidity, soil_PH, soil_conductivity FROM environment_data ORDER BY id DESC LIMIT 1''')  # 明确指定列名，确保数据顺序
        data = c.fetchone()
    except sqlite3.Error as e:
        print("Database error: ", e)
        return {}
    except Exception as e:
        print("Exception in get_latest_data: ", e)
        return {}
    finally:
        if conn:
            conn.close()

    if data:
        return {
            'temperature': data[0],
            'humidity': data[1],
            'lightIntensity': data[2],
            'co2Concentration': data[3],
            'soilTemperature': data[4],
            'soilHumidity': data[5],
            'soilPH': data[6],
            'soilConductivity': data[7]
        }
    else:
        return {}

# 处理获取继电器状态的WebSocket请求
@socketio.on('get_relay_status')
def handle_get_relay_status(message):
    print('Received request for relay status')
    # 向MQTT的relay主题发送请求状态的消息
    client.publish(MQTT_TOPIC2, json.dumps({"action": "ask"}))
    # 我们已经从某处获取了继电器的状态
    emit('relay_status', relay_status)

# 处理控制继电器状态的WebSocket请求
@socketio.on('control_relay')
def handle_control_relay(message):
    print('Received control relay message: ', message)
    # 将接收到的控制消息转发到MQTT的relay主题
    client.publish(MQTT_TOPIC2, json.dumps({
        "action": "ctrl",
        **message  # 这里假设message已经是我们需要的格式
    }))
    # 我们已经从MQTT或其他地方获取了继电器改变状态后的信息
    emit('relay_updated_status', relay_status)

if __name__ == '__main__':
    socketio.run(app, port=5000)