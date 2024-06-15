import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Box';

export default function Speech() {
    const [text, setText] = useState('');
    const message = "你好，我是番茄小助手，有什么想问的吗？";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setText((prevText) => prevText + message[index]);
            index++;
            if (index === message.length) clearInterval(timer);
        }, 100); // 每150毫秒添加一个字符

        return () => clearInterval(timer); // 组件卸载时清除定时器
    }, []);

    return (
        <Layout title='语音交流' minTitle='Speech'>
            <div className='speech'>
                <div className='speech-title'>{text}</div>
            </div>
        </Layout>
    );
}