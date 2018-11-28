import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { ChildProcess, spawn } from 'child_process';

import { app, BrowserWindow, ipcMain } from 'electron';
import electronReload from 'electron-reload';
import kill from 'tree-kill';

import { START_SERVER, KILL_SERVER, SERVER_SDTOUT } from './ipcTypes';

electronReload(__dirname);

let mainWindow: BrowserWindow | null;
let serverProcess: ChildProcess;

app.on('ready', createWindow);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (serverProcess) {
    console.log('killing previous process', serverProcess.pid);
    kill(serverProcess.pid);
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(START_SERVER, () => {
  if (serverProcess) {
    console.log('stopping previous process');
    kill(serverProcess.pid);
  }

  console.log('starting server');
  serverProcess = spawn('python', [
    path.join(__dirname, '../server/server.py')
  ]);

  serverProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    mainWindow.webContents.send(SERVER_SDTOUT, data.toString());
  });

  serverProcess.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  serverProcess.on('close', () => {
    console.log('stopping server');
  });
});

ipcMain.on(KILL_SERVER, () => {
  if (serverProcess) {
    kill(serverProcess.pid);
  }
});
