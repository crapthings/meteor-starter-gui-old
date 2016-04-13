'use strict';

const Electron = require('electron');

// Module to control application life.
const electron = Electron.app;

// Module to create native browser window.
const BrowserWindow = Electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

electron.on('ready', createWindow);

electron.on('window-all-closed', function () { process.platform !== 'darwin' && electron.quit() });

electron.on('activate', function () { !mainWindow && createWindow() });

function createWindow () {
  //
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  //
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // dev
  mainWindow.webContents.openDevTools();

  //
  mainWindow.on('closed', function() { mainWindow = null });
}
