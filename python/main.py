'''
Author: ckdfs 2459317008@qq.com
Date: 2024-06-06 02:20:27
LastEditors: ckdfs 2459317008@qq.com
LastEditTime: 2024-06-06 06:06:39
FilePath: \agricultural-big-data-server\main.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # 这行代码会启用CORS

@app.route('/environment_data')
def get_environment_data():
    # 生成随机的环境数据
    data = {
        'temperature': f"{random.uniform(-50.0, 50.0):.2f}°C",
        'humidity': f"{random.uniform(0, 100):.2f}%",
        'light_intensity': f"{random.uniform(0, 10000):.2f}lux",
        'CO2_concentration': f"{random.uniform(0, 5000):.2f}ppm",
        'soil_temperature': f"{random.uniform(-50.0, 50.0):.2f}°C",
        'soil_humidity': f"{random.uniform(0, 100):.2f}%",
        'soil_PH': f"{random.uniform(0, 14):.2f}",
        'soil_conductivity': f"{random.uniform(0, 2000):.2f}μS/cm"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)