/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 00:06:38
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-06 02:44:17
 * @FilePath: \agricultural-big-data\src\containers\Natural.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const timer = setInterval(() => {
            axios.get('http://localhost:5000/temperature')
                .then(response => {
                    setTemperature(response.data.temperature);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const data = [
        [
            { icon: $icon('temperature'), list: [{ title: '平均气温', val: temperature }] },
        ],
        [
            { icon: $icon('rainfull'), list: [{ title: '年均降雨', val: '384.5mm' }] },
        ],
        [
            { icon: $icon('wind'), list: [{ title: '平均风速', val: '3.4m/s' }] },
        ],
        [
            { icon: $icon('geogarphy'), list: [{ title: '地形地貌', val: '冲击平原区' }] },
        ],
        {
            icon: $icon('riverway1'), list: [
                { title: '一级河道', val: '5个' },
                { title: '二级河道', val: '12个' },
                { title: '蓄水量', val: '1.7亿m3' },
            ]
        },
        {
            icon: $icon('forest'), list: [
                { title: '区域面积', val: '1296km2' },
                { title: '林地面积', val: '90万亩' },
            ],
        }
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