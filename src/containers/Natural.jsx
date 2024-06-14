/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 00:06:38
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-15 07:10:49
 * @FilePath: \agricultural-big-data\src\containers\Natural.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Layout from '../layouts/Box';
import { $icon } from '../utils';

const Box = ({ icon, list = [] }) => (
    <div className='box'>
        <div className='box-icon'>
            <img src={icon} alt='' />
            {[...new Array(4)].map((v, i) => <span key={i} className='dot' />)}
        </div>
        <div className='box-right'>
            {list.map((item, index) => (
                <div key={index} className='box-item'>
                    <h4>{item.title}</h4>
                    <h2>{item.val}</h2>
                </div>
            ))}
        </div>
    </div>
);

export default function Natural() {
    const [temperature, setTemperature] = useState('NA°C');
    const [humidity, setHumidity] = useState('NA%');
    const [lightIntensity, setLightIntensity] = useState('NA lux');
    const [co2Concentration, setCo2Concentration] = useState('NA ppm');
    const [soilTemperature, setSoilTemperature] = useState('NA°C');
    const [soilHumidity, setSoilHumidity] = useState('NA%');
    const [soilPH, setSoilPH] = useState('NA');
    const [soilConductivity, setSoilConductivity] = useState('NA μS/cm');

    useEffect(() => {
        // 建立WebSocket连接
        const socket = io('http://localhost:5000');
        socket.on('connect', () => {
            console.log('WebSocket connected');
        });
        // 监听服务端推送的环境数据更新
        socket.on('environment_data', (data) => {
            setTemperature(`${data.temperature}°C`);
            setHumidity(`${data.humidity}%`);
            setLightIntensity(`${data.lightIntensity} lux`);
            setCo2Concentration(`${data.co2Concentration} ppm`);
            setSoilTemperature(`${data.soilTemperature}°C`);
            setSoilHumidity(`${data.soilHumidity}%`);
            setSoilPH(data.soilPH);
            setSoilConductivity(`${data.soilConductivity} μS/cm`);
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);

    const data = [
        [
            { icon: $icon('temperature'), list: [{ title: '温度', val: temperature }] },
        ],
        [
            { icon: $icon('rainfull'), list: [{ title: '湿度', val: humidity }] },
        ],
        [
            { icon: $icon('wind'), list: [{ title: '光照强度', val: lightIntensity }] },
        ],
        [
            { icon: $icon('geogarphy'), list: [{ title: 'CO₂浓度', val: co2Concentration }] },
        ],
        [
            { icon: $icon('riverway1'), list: [{ title: '土壤温度', val: soilTemperature }] },
        ],
        [
            { icon: $icon('forest'), list: [{ title: '土壤湿度', val: soilHumidity }] },
        ],
        [
            { icon: $icon('riverway2'), list: [{ title: '土壤PH值', val: soilPH }] },
        ],
        [
            { icon: $icon('crops1'), list: [{ title: '土壤电导率', val: soilConductivity }] },
        ],
    ];

    return (
        <Layout title='自然条件' minTitle='Natural conditions'>
            <div className='natural'>
                {data.map((item, index) => (
                    <div className='natural-list' key={index}>
                        {Array.isArray(item) ?
                            <div className='natural-row'>
                                {item.map((v, idx) => <Box key={idx} {...v} />)}
                            </div> :
                            <div className='natural-row'>
                                <Box {...item} />
                            </div>
                        }
                    </div>
                ))}
            </div>
        </Layout>
    );
}