/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 00:06:38
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-09 10:21:23
 * @FilePath: \agricultural-big-data\src\containers\Industrial.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import AnNumber from 'animated-number-react';

import Layout from '../layouts/Box';

const MarkTitle = ({ title }) => (
    <div className='mark-title'>
        <span className='dot' />{title}
    </div>
);

export default function Industrial() {
    const data = {
        l1: [
            { title: '占地面积', val: 2.44, unit: '万亩' },
            { title: '预计亩产', val: 1.23, unit: '万斤' },
            { title: '预计收入', val: 2.42, unit: '万元' },
        ],
    };
    return (
        <Layout title='产业园区' minTitle='Industrial Park'>
            <div className='industrial'>
                <MarkTitle title='园区概况' />
                <div className='list'>
                    {data.l1.map((item, index) => (
                        <div className='list-item' key={index}>
                            <div className='list-title'>{item.title}</div>
                            <div className='list-val'>
                                <AnNumber
                                    value={item.val}
                                    formatValue={val => val.toFixed(2) + item.unit}
                                    duration={1250}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <MarkTitle title='基础设施' />
                <div style={{ height: 16 }}></div>
                <div className='wordcloud'>
                    <span className='w1'>高精度病害检测</span>
                    <span className='w2'>智能终端摄像头</span>
                    <span className='w3'>协同物联网传感器</span>
                    <span className='w4'>数据上云</span>
                    <span className='w5'>大屏中控</span>
                    <span className='w6'>大数据新经济</span>
                    <span className='w7'>语音交互</span>
                </div>
            </div>
        </Layout>
    );
}