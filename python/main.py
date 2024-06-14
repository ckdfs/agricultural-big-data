'''
Author: ckdfs 2459317008@qq.com
Date: 2024-06-06 02:20:27
LastEditors: ckdfs 2459317008@qq.com
LastEditTime: 2024-06-12 17:31:05
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

# 当接收到服务器响应订阅请求时的回调
def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed to topic : " + MQTT_TOPIC)

# 当接收到服务器推送的消息时的回调
def on_message(client, userdata, msg):
    print("Received data: " + msg.payload.decode())
    data = json.loads(msg.payload)  # 假设消息是JSON格式
    store_data(data)
    # 通过WebSocket广播环境信息
    socketio.emit('environment_data', data)  # 正确使用broadcast参数

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
client.loop_start()

@app.route('/environment_data')
def get_environment_data():
    data = get_latest_data()
    return jsonify(data)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # 可以在这里发送最新的环境信息给刚连接的客户端
    data = get_latest_data()
    emit('environment_data', data)

def get_latest_data():
    # 从数据库获取最新的环境信息
    conn = sqlite3.connect('environment.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM environment_data ORDER BY id DESC LIMIT 1''')  # 假设有一个自增的id字段
    data = c.fetchone()
    conn.close()
    if data:
        # 假设数据表的列顺序与store_data中的插入顺序相同
        return {
            'temperature': data[2],
            'humidity': data[3],
            'light_intensity': data[4],
            'CO2_concentration': data[5],
            'soil_temperature': data[6],
            'soil_humidity': data[7],
            'soil_PH': data[8],
            'soil_conductivity': data[9]
        }
    else:
        return {}

if __name__ == '__main__':
    socketio.run(app, port=5000)