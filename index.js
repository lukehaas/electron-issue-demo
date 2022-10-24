const { app, dialog, BrowserWindow, ipcMain } = require('electron');
const path = require('path')

const html = `
<html>
  <head>
    <title>Issue</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;">
    <button id="btn">Open dialog</button>
  </body>
</html>
`;
const base64Str = Buffer.from(html).toString('base64');
const url = `data:text/html;base64,${base64Str}`;

let mainWindow;

async function openDialog() {
  const { response } = await dialog.showMessageBox(mainWindow, {
    title: 'Electron',
    type: 'warning',
    message: 'Linux defect',
    detail: 'Buttons are not clickable on Linux',
    cancelId: 2,
    buttons: ['One', 'Two', 'Cancel'],
  });
  return response;
}

ipcMain.handle('open-dialog', openDialog);

function ready() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  mainWindow.loadURL(url);
}

app.whenReady().then(ready);
