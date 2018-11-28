import React, { Component } from 'react';
import { KILL_SERVER, START_SERVER } from '../../ipcEventTypes';

declare const ipcRenderer: any;

export interface AppState {
  port: number | undefined;
  serverIsRunning: boolean;
}

class App extends Component {
  state: AppState = {
    port: undefined,
    serverIsRunning: false
  };

  componentDidMount() {
    ipcRenderer.on('server_started', () => {
      console.log('heard: server started');
    });
  }

  startServer = () => {
    this.setState({ serverIsRunning: true });
    ipcRenderer.send(START_SERVER);
  };

  killServer = () => {
    this.setState({ serverIsRunning: false });
    ipcRenderer.send(KILL_SERVER);
  };

  render() {
    return (
      <div>
        <h1>Pylectron</h1>
        <p>Welcome to your app</p>
        <button onClick={this.startServer}>Start Server</button>
        <button
          disabled={!this.state.serverIsRunning}
          onClick={this.killServer}>
          Kill Server
        </button>
      </div>
    );
  }
}

export default App;
