const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const qrcode = require('qrcode');
const fs = require('fs');
const csv = require('csv-parser');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

let mainWindow;
let waClient;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('renderer.html');
}

app.whenReady().then(() => {
  createWindow();
  initWhatsAppClient();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// init WA client
function initWhatsAppClient() {
  waClient = new Client({
    authStrategy: new LocalAuth({ clientId: "mass-sender" }),
    puppeteer: { headless: true, args: ['--no-sandbox'] } // headless = no visible Chromium
  });

  waClient.on('qr', async qr => {
    // convert qr string to data URL
    const url = await qrcode.toDataURL(qr);
    mainWindow.webContents.send('wa-qr', url);
  });

  waClient.on('ready', async () => {
    console.log('WA ready');
    mainWindow.webContents.send('wa-ready', true);
    // fetch profile name & picture url
    try {
      const me = await waClient.getContactById(waClient.info.wid._serialized);
      const pushname = waClient.info.pushname || me.pushname || 'Me';
      let pfpUrl = null;
      try {
        pfpUrl = await waClient.getProfilePicUrl(waClient.info.wid._serialized);
      } catch(e) { /* no profile pic */ }
      mainWindow.webContents.send('wa-profile', { name: pushname, pfp: pfpUrl });
    } catch (e) {
      console.error('profile fetch error', e);
    }
  });

  waClient.on('authenticated', () => {
    console.log('authenticated');
    mainWindow.webContents.send('wa-auth', true);
  });

  waClient.on('auth_failure', msg => {
    console.error('auth failure', msg);
    mainWindow.webContents.send('wa-auth-failure', msg);
  });

  waClient.initialize();
}

// IPC from renderer: send messages, import csv, attach media
const { dialog } = require('electron');

ipcMain.handle('choose-csv', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'CSV Files', extensions: ['csv'] }],
    properties: ['openFile']
  });
  if (result.canceled || !result.filePaths.length) return null;
  return result.filePaths[0];
});


ipcMain.handle('send-bulk', async (event, { contacts, message, mediaPath, delayMin, delayMax }) => {
  if (!waClient || !waClient.info) throw new Error('WhatsApp not ready');
  const results = [];
  for (let i=0;i<contacts.length;i++) {
    const phone = contacts[i].replace(/\+/g,'').replace(/\s/g,'');
    const chatId = phone + "@c.us";
    try {
      // send text
      if (message && message.trim().length) {
        await waClient.sendMessage(chatId, message);
      }
      // send media
      if (mediaPath) {
        const media = MessageMedia.fromFilePath(mediaPath);
        await waClient.sendMessage(chatId, media);
      }
      results.push({ phone, status: 'sent' });
      // random delay
      const delay = Math.floor(Math.random() * (delayMax - delayMin + 1)) + delayMin;
      await new Promise(r => setTimeout(r, delay));
      // occasional longer break
      if (i % 25 === 0 && i !== 0) await new Promise(r => setTimeout(r, Math.floor(Math.random()*20000)+10000));
      mainWindow.webContents.send('send-progress', { index: i+1, total: contacts.length, phone });
    } catch (err) {
      results.push({ phone, status: 'error', error: err.toString() });
      mainWindow.webContents.send('send-progress', { index: i+1, total: contacts.length, phone, error: err.toString() });
    }
  }
  return results;
});

ipcMain.handle('get-profile', async () => {
  try {
    const pushname = waClient.info.pushname || 'Me';
    let pfpUrl = null;
    try { pfpUrl = await waClient.getProfilePicUrl(waClient.info.wid._serialized); } catch(e){}
    return { name: pushname, pfp: pfpUrl };
  } catch(e) {
    return { name: 'Unknown', pfp: null };
  }
});
