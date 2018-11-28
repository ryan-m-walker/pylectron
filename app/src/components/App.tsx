import React, { Component } from 'react';
import { KILL_SERVER, START_SERVER } from '../../ipcTypes';

declare const ipcRenderer: any;

interface AppState {
  port: number | undefined;
  serverIsRunning: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      port: undefined,
      serverIsRunning: false
    };
  }

  startServer() {
    this.setState({ serverIsRunning: true });
    ipcRenderer.send(START_SERVER);
  }

  killServer() {
    this.setState({ serverIsRunning: false });
    ipcRenderer.send(KILL_SERVER);
  }

  render() {
    return (
      <div>
        <h1>Pylectron</h1>
        <p>Welcome to your app</p>
        <button onClick={this.startServer.bind(this)}>Start Server</button>
        <button
          disabled={!this.state.serverIsRunning}
          onClick={this.killServer.bind(this)}>
          Kill Server
        </button>
      </div>
    );
  }
}

export default App;
