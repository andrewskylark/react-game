import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom"
// import { createStore } from 'redux';

import App from './App';
import store from './store';
import './index.css';

// const store = new createStore();

reactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
