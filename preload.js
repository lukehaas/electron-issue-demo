const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', () => {
    ipcRenderer.invoke('open-dialog').then((response) => {
      alert(response);
    })
  })
})