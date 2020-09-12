import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from 'react-router-dom';
import { process } from 'joi-browser';

ReactDOM.render( 
    <BrowserRouter>
        < App / >
    </BrowserRouter> , document.getElementById('root')
);
registerServiceWorker();