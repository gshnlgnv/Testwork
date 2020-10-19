import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {rootReducer} from '../src/Components/rootReducer.js';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
    , document.getElementById("root"));