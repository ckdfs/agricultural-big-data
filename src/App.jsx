import React from 'react';

import Navigation from './components/Navigation';
import Natural from './containers/Natural';
import Farming from './containers/Farming';
import Industrial from './containers/Industrial';
import Advantage from './containers/Advantage';
import Profittrend from './containers/Profittrend';

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
                    <Advantage />
                </div>
                <div className='main-center'>
                    <div className='main-center-panel'>
                        <Profittrend />
                    </div>

                    <Farming />
                </div>
            </section>
            <footer>
                <p>Copyright © 2024 <a href='https://github.com/ckdfs' target='_blank' rel="noopener noreferrer">ckdfs</a></p>
            </footer>
        </div>
    );
}



