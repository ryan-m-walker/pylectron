import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { SERVER_SDTOUT } from '../ipcEventTypes';

declare const ipcRenderer: any;

ipcRenderer.on(SERVER_SDTOUT, console.log);

console.log(ipcRenderer);

ReactDOM.render(<App />, document.getElementById('app-root'));
