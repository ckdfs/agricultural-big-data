'''
Author: ckdfs 2459317008@qq.com
Date: 2024-06-06 02:20:27
LastEditors: ckdfs 2459317008@qq.com
LastEditTime: 2024-06-06 21:23:15
FilePath: \agricultural-big-data\python\main.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import paho.mqtt.client as mqtt
import json

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

# 将数据存储到数据库
def store_data(data):
    conn = sqlite3.connect('environment.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO environment_data (
            temperature,
            humidity,
            light_intensity,
            CO2_concentration,
            soil_temperature,
            soil_humidity,
            soil_PH,
            soil_conductivity
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['temperature'],
        data['humidity'],
        data['light_intensity'],
        data['CO2_concentration'],
        data['soil_temperature'],
        data['soil_humidity'],
        data['soil_PH'],
        data['soil_conductivity']
    ))
    conn.commit()
    conn.close()
    print("Data stored to database: " + str(data))

# 创建一个MQTT客户端
client = mqtt.Client()

# 指定回调函数
client.on_subscribe = on_subscribe
client.on_message = on_message

# 连接到MQTT服务器
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# 订阅主题
client.subscribe(MQTT_TOPIC, qos=1)

# 开始监听
client.loop_start()

app = Flask(__name__)
CORS(app)  # 这行代码会启用CORS

def get_latest_data():
    conn = sqlite3.connect('environment.db')
    c = conn.cursor()
    c.execute('''
        SELECT 
            temperature,
            humidity,
            light_intensity,
            CO2_concentration,
            soil_temperature,
            soil_humidity,
            soil_PH,
            soil_conductivity
        FROM environment_data ORDER BY timestamp DESC LIMIT 1
    ''')
    data = c.fetchone()
    conn.close()
    return {
        'temperature': data[0],
        'humidity': data[1],
        'light_intensity': data[2],
        'CO2_concentration': data[3],
        'soil_temperature': data[4],
        'soil_humidity': data[5],
        'soil_PH': data[6],
        'soil_conductivity': data[7]
    }

@app.route('/environment_data')
def get_environment_data():
    data = get_latest_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)