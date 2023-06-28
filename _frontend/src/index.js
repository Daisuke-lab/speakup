// import React, { useEffect }from 'react';
import ReactDOM from 'react-dom';
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import reducer from './store/reducers/index';
import App from './App';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';


const initialState = {}
const middelware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middelware))
)

const app = 
    <Provider store={store}>
        <App />
    </Provider>



ReactDOM.render(app, document.getElementById("root"));