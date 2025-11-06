const qrImg = document.getElementById('qr');
const status = document.getElementById('status');
const profilePic = document.getElementById('profilePic');
const profileName = document.getElementById('profileName');
const csvInput = document.getElementById('csvPath');
const contactsCount = document.getElementById('contactsCount');
const messageEl = document.getElementById('message');
const mediaInput = document.getElementById('mediaPath');
const delayMinEl = document.getElementById('delayMin');
const delayMaxEl = document.getElementById('delayMax');
const btnStart = document.getElementById('btnStart');
const log = document.getElementById('log');

let contacts = [];

window.api.onQR((dataUrl) => {
  qrImg.src = dataUrl;
  status.innerText = "Scan QR with your WhatsApp mobile app";
});

window.api.onReady(() => {
  status.innerText = "Logged in!";
  qrImg.style.display = 'none';
});

window.api.onProfile((d) => {
  profileName.innerText = d.name || 'Me';
  profilePic.src = d.pfp || '';
  if (!d.pfp) profilePic.style.display = 'none';
  else profilePic.style.display = 'inline-block';
});

csvInput.addEventListener('change', async (ev) => {
  const file = ev.target.files[0];
  if (!file) return;
  // we send path to main to parse csv (file path available in file.path)
  // but browser File object doesn't show path — in Electron file input returns path in files[0].path
  const path = file.path;
  appendLog('Importing CSV: ' + path);
  try {
    const res = await window.api.importCsv(path);
    contacts = res;
    contactsCount.innerText = `${contacts.length} contacts loaded`;
    appendLog(`Contacts loaded: ${contacts.length}`);
  } catch (e) {
    appendLog('CSV import error: ' + e);
  }
});

btnStart.addEventListener('click', async () => {
  if (!contacts || contacts.length === 0) { appendLog('No contacts loaded'); return; }
  const message = messageEl.value || '';
  const mediaFile = mediaInput.files[0];
  const mediaPath = mediaFile ? mediaFile.path : null;
  const delayMin = parseInt(delayMinEl.value) || 3000;
  const delayMax = parseInt(delayMaxEl.value) || 7000;

  appendLog(`Starting sending to ${contacts.length} contacts...`);
  try {
    const results = await window.api.sendBulk({ contacts, message, mediaPath, delayMin, delayMax });
    appendLog('Done. Summary: ' + JSON.stringify(results));
  } catch (e) {
    appendLog('Send error: ' + e);
  }
});

window.api.onProgress((p) => {
  appendLog(`Sent ${p.index}/${p.total} => ${p.phone} ${p.error?('ERROR:'+p.error):'OK'}`);
});

function appendLog(s) {
  log.innerText += `[${new Date().toLocaleTimeString()}] ${s}\n`;
  log.scrollTop = log.scrollHeight;
}
