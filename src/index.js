import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import App from './components/app/app';
import {ApiServiceProvider} from "./components/api-service-contex";
import ApiService from "./services/api-service";

const apiService = new ApiService();

ReactDOM.render(
    <ApiServiceProvider value={apiService}>
        <App/>
    </ApiServiceProvider>,
    document.getElementById('root')
);
