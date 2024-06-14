/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-09 00:56:24
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-15 07:54:17
 * @FilePath: \agricultural-big-data\src\containers\Control.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Layout from '../layouts/Box';

const socket = io('http://localhost:5000'); // 假设后端服务运行在localhost:5000

const MarkTitle = ({ title }) => (
    <div className='mark-title'>
        <span className='dot' />{title}
    </div>
);

export default function Control() {
    const [buttonStates, setButtonStates] = useState({
        relay1: false,
        relay2: false,
        relay3: false,
        relay4: false,
    });

    useEffect(() => {
        // 组件挂载时连接WebSocket并监听relay_status事件
        socket.on('relay_status', (status) => {
            console.log('Relay status received:', status);
            setButtonStates(status);
        });
    
        // 处理服务器的响应消息
        socket.on('ans', (response) => {
            console.log('Answer received:', response);
            setButtonStates(response);
        });
    
        // 请求继电器的当前状态
        socket.emit('get_relay_status');
    
        // 组件卸载时断开连接
        return () => {
            socket.off('relay_status');
            socket.off('ans');
            socket.off('ctrl');
            socket.disconnect();
        };
    }, []);

    const toggleButtonState = (button) => {
        // 复制当前状态
        const newButtonStates = {
            ...buttonStates,
            [button]: !buttonStates[button] // 只更新当前按钮状态
        };
    
        // 创建要发送的消息
        const message = {
            ...newButtonStates,
            action: "ctrl"
        };
    
        // 更新本地状态
        setButtonStates(newButtonStates);
    
        // 发送WebSocket消息
        socket.emit('control_relay', message);
        console.log(message);
    };

    return (
        <Layout title='控制按钮' minTitle='Control Button'>
            <div className='control'>
                <MarkTitle title='风扇' />
                <div className='list'>
                    <div className='list-item' onClick={() => toggleButtonState('relay1')}>
                        <div className='list-title'>风扇1</div>
                        <div className='list-val'>{buttonStates.relay1 ? '开' : '关'}</div>
                    </div>
                    <div className='list-item' onClick={() => toggleButtonState('relay2')}>
                        <div className='list-title'>风扇2</div>
                        <div className='list-val'>{buttonStates.relay2 ? '开' : '关'}</div>
                    </div>
                </div>
                <MarkTitle title='水泵' />
                <div className='list' style={{ padding: '0 12px' }}>
                    <div className='list-item' onClick={() => toggleButtonState('relay3')}>
                        <div className='list-title'>水泵1</div>
                        <div className='list-val'>{buttonStates.relay3 ? '开' : '关'}</div>
                    </div>
                    <div className='list-item' onClick={() => toggleButtonState('relay4')}>
                        <div className='list-title'>水泵2</div>
                        <div className='list-val'>{buttonStates.relay4 ? '开' : '关'}</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}