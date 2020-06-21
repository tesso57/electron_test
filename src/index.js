const ipcRenderer = window.ipcRenderer;
const app = window.app;
const Datastore = window.Datastore;

const db = new Datastore({ 
    filename: app.getPath('userData')+'/member.db',
    autoload: true
});