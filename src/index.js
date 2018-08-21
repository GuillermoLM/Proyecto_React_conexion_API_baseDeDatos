import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from "./Routes";
import Header from "./Header";
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
    <div>
        <AppRoutes/>
    </div>
 , document.getElementById('root'));
registerServiceWorker();