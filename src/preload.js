const electron = require('electron');

process.once('loaded', () => {
    global.app = electron.remote.app;
    global.ipcRenderer = electron.ipcRenderer;
    global.Datastore = require('nedb');
});