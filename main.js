const { ipcMain, app, BrowserWindow } = require('electron');
const path = require('path');
// import { isDev } from 'electron-is-dev';

try {
    require('electron-reloader')(module);
  } catch {}

  let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        frame: false,
        transparent: true,
        opacity: 0.9,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    isDev = true;
    const indexPath = isDev
    ? `http://localhost:8080`
    : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(indexPath);

    mainWindow.on('closed', () => {
        app.quit();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('ready', (event, arg) => {
    console.log(event, arg);
    mainWindow.show();
    mainWindow.focus();
    app.dock.show();
});