import React from 'react';
import Layout from '../layouts/Box';

import fullImage from '../assets/camera.png';
import secondImage from '../assets/camera2.png'; // 假设这是第二张图片的路径

export default function Camera() {
    const rootStyle = {
        margin: '0 auto', maxWidth: 720
    };

    // 添加图片样式
    const imageStyle = {
        maxWidth: '50%', // 限制最大宽度，100% 表示不超过容器宽度
        maxHeight: '500px', // 限制最大高度
        width: 'auto', // 宽度自动，保持宽高比
        height: 'auto', // 高度自动，保持宽高比
        objectFit: 'cover' // 确保图片覆盖整个容器，必要时进行裁剪
    };

    // 添加并排显示的样式
    const imagesContainerStyle = {
        display: 'flex', // 使用Flexbox布局
        justifyContent: 'center', // 让图片居中显示
        alignItems: 'center', // 垂直居中
        gap: '5px'
    };

    // return (
    //     <Layout title='盈利趋势' minTitle='Profit trend' style={rootStyle}>
    //         <div className='camera'>
    //             <div className='images-container' style={imagesContainerStyle}>
    //                 <img src={fullImage} alt="Full view" style={imageStyle} />
    //                 <img src={secondImage} alt="Second view" style={imageStyle} />
    //             </div>
    //         </div>
    //     </Layout>
    // );
    return (
        <Layout title='盈利趋势' minTitle='Profit trend'>
            <div className='camera'>
                <div className='images-container' style={imagesContainerStyle}>
                <img src={fullImage} alt="Full view" style={imageStyle} />
                <img src={secondImage} alt="Second view" style={imageStyle} />
                </div>
            </div>
        </Layout>
    );
}