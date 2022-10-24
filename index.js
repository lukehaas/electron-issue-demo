const { app, dialog, BrowserWindow } = require('electron');

const html = `
<html>
  <head>
    <title>Issue</title>
  </head>
</html>
`;
const base64Str = Buffer.from(html).toString('base64');
const url = `data:text/html;base64,${base64Str}`;

let mainWindow;

function openDialog() {
  dialog.showMessageBox(mainWindow, {
    title: 'RunJS',
    type: 'warning',
    message: 'Linux defect',
    detail: 'Buttons are not clickable on Linux',
    cancelId: 2,
    buttons: ['One', 'Two', 'Cancel'],
  });
}

function ready() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  
  mainWindow.loadURL(url);

  mainWindow.webContents.on('did-finish-load', openDialog);
}

app.whenReady().then(ready);
