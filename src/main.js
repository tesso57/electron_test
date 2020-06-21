'use strict';

//モジュールを使えるようにする
const { app, BrowserWindow,Menu } = require("electron");

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

//アプリの画面を作成
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, height: 600, icon: path.join(__dirname, '../../assets/icons/linux_icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
}

//メニューバー内容
let template = [{
  label: 'Your-App',
  submenu: [{
    label: 'アプリを終了',
    accelerator: 'Cmd+Q',
    click: function () {
      app.quit();
    }
  }]
}, {
  label: 'Window',
  submenu: [{
    label: '最小化',
    accelerator: 'Cmd+M',
    click: function () {
      mainWindow.minimize();
    }
  }, {
    label: '最大化',
    accelerator: 'Cmd+Ctrl+F',
    click: function () {
      mainWindow.maximize();
    }
  }, {
    type: 'separator'
  }, {
    label: 'リロード',
    accelerator: 'Cmd+R',
    click: function () {
      BrowserWindow.getFocusedWindow().reload();
    }
  }]
}]
// Electronの初期化完了後に実行
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
  //developtoolを表示させるやつ
  // mainWindow.webContents.openDevTools();

});

//アプリの画面が閉じられたら実行
app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  if (process.platform !== 'darwin') {
    mainWindow = null;
    app.quit()
  }
});

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的です。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});