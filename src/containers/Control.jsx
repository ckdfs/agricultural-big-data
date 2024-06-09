/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-09 00:56:24
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-09 14:11:23
 * @FilePath: \agricultural-big-data\src\containers\Control.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import Layout from '../layouts/Box';

const MarkTitle = ({ title }) => (
    <div className='mark-title'>
        <span className='dot' />{title}
    </div>
);

export default function Control() {
    // 初始化按钮状态
    const [buttonStates, setButtonStates] = useState({
        fan1: false,
        fan2: false,
        pump1: false,
        pump2: false,
    });

    // 切换按钮状态的函数
    const toggleButtonState = (button) => {
        setButtonStates(prevState => ({
            ...prevState,
            [button]: !prevState[button],
        }));
    };

    return (
        <Layout title='控制按钮' minTitle='Control Button'>
            <div className='control'>
                <MarkTitle title='风扇' />
                <div className='list'>
                    <div className='list-item' onClick={() => toggleButtonState('fan1')}>
                        <div className='list-title'>风扇1</div>
                        <div className='list-val'>{buttonStates.fan1 ? '开' : '关'}</div>
                    </div>
                    <div className='list-item' onClick={() => toggleButtonState('fan2')}>
                        <div className='list-title'>风扇2</div>
                        <div className='list-val'>{buttonStates.fan2 ? '开' : '关'}</div>
                    </div>
                </div>
                <MarkTitle title='水泵' />
                <div className='list' style={{ padding: '0 12px' }}>
                    <div className='list-item' onClick={() => toggleButtonState('pump1')}>
                        <div className='list-title'>水泵1</div>
                        <div className='list-val'>{buttonStates.pump1 ? '开' : '关'}</div>
                    </div>
                    <div className='list-item' onClick={() => toggleButtonState('pump2')}>
                        <div className='list-title'>水泵2</div>
                        <div className='list-val'>{buttonStates.pump2 ? '开' : '关'}</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}