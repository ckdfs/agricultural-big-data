/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 00:06:38
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-06 05:16:35
 * @FilePath: \agricultural-big-data\src\components\Navigation.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import { $icon } from '../utils';


export default function Navigation() {
    const handleClose = () => {
        window.close();
    };

    return (
        <div className='navigation'>
            <div className='center'>
                <div className='logo'>
                    <img src={require('../assets/icon/crops1.svg')} alt='' />
                </div>
                <div className='title'>
                    <p>智慧农业大数据平台 · 大屏中心</p>
                    <p>Smart Agriculture Big Data Platform · Large Screen Center</p>
                </div>
            </div>
            <div className='tool'>
                {/* <div className='tool-item'>
                    <img src={$icon('setting')} alt='' />
                    <span>设置</span>
                </div> */}
                <div className='tool-item' onClick={handleClose}>
                    <img src={$icon('poweroff')} alt='' />
                    <span>退出</span>
                </div>
            </div>
        </div>
    );
}

