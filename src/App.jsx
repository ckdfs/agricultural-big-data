/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 00:06:38
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-15 08:13:49
 * @FilePath: \agricultural-big-data\src\App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import Navigation from './components/Navigation';
import Natural from './containers/Natural';
import Farming from './containers/Farming';
import Speech from './containers/Speech';
import Industrial from './containers/Industrial';
// import Profittrend from './containers/Profittrend';
import Control from './containers/Control';
import Camera from './containers/Camera';

export default function App() {
    return (
        <div className='app'>
            <Navigation />
            <section className='main'>
                <div className='main-left'>
                    <Natural />\
                </div>
                <div className='main-right'>
                    <Industrial />
                    <Control />
                </div>
                <div className='main-center'>
                    <div className='main-center-panel'>
                        {/* <Profittrend /> */}
                        <Camera />
                    </div>

                    <Speech />
                </div>
            </section>
            <footer>
                <p>Copyright © 2024 <a href='https://github.com/ckdfs' target='_blank' rel="noopener noreferrer">ckdfs</a></p>
            </footer>
        </div>
    );
}



