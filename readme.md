<div align="center">

# 💬 Mass Sender Pro  
### ⚡ A modern, cross-platform WhatsApp Bulk-Message Manager built with Electron + WhatsApp-Web.js  

<img src="https://user-images.githubusercontent.com/placeholder/qr-demo.png" width="320" alt="App Screenshot" />

> Import contacts → Clean numbers → Send personalized messages or media in bulk — all from your desktop.

[![Made with Electron](https://img.shields.io/badge/Made%20with-Electron-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![whatsapp-web.js](https://img.shields.io/badge/API-whatsapp--web.js-25D366?logo=whatsapp&logoColor=white)](https://github.com/pedroslopez/whatsapp-web.js)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 🚀 Features

- ✅ **Secure WhatsApp Web login** (QR-based, saved locally via `LocalAuth`)
- 📂 **CSV Import + Auto Cleaning** – detects numbers, removes symbols/spaces  
- 🧾 **Live Preview & Export** – review contacts, export cleaned list  
- 📝 **Custom Message Composer** – send text + optional media (image/video)  
- ⏱️ **Smart Delay Engine** – random delays + auto-pause every 25 sends  
- ⏸️ **Pause / Resume / Stop** bulk sessions anytime  
- 💡 **Real-Time Logs & Progress Bar**  
- 🎨 **Modern Dark UI** with soft glass effect  
- 💻 **Cross-Platform:** Windows / macOS / Linux  

---

## 🧰 Tech Stack

| Layer | Tools |
|-------|-------|
| Core | [Electron](https://electronjs.org) |
| WhatsApp API | [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) |
| UI / Frontend | HTML + CSS + Vanilla JS |
| Data | CSV-Parser, QRCode |
| Packaging | Electron Builder (NSIS Installer) |

---

## 📦 Installation / Setup
2️⃣ Install dependencies
> ```npm install```

3️⃣ Start the app (dev mode)

> ```npm start```

4️⃣ Build a Windows installer
> ```npm run dist```


Output will appear in dist/ (auto-creates .exe installer).

🖥️ Usage Guide

Run Mass Sender Pro
You’ll see a QR code — scan it with WhatsApp on your phone.

Import Contacts (.csv)
File → Select CSV (column = numbers).
Example:

+919876543210
918765432109
+441234567890


Preview Contacts
Click Preview to verify list, remove duplicates if needed.

Compose Message
Type your message and optionally attach media.

Set Delay Range
Random delays (e.g. 3000–7000 ms) help reduce ban risk.

Start Bulk Send
Press Start — watch progress bar + logs.
Use Pause / Stop anytime.

Export Cleaned CSV (optional)
Downloads a validated list of numbers.

📸 UI Preview
Login / QR	Dashboard

	
```
Replace the above images with your own screenshots under /assets/demo/.

⚙️ Project Structure
mass-sender-pro/
├── main.js              # Electron main process
├── preload.js           # Secure IPC bridge
├── renderer.html        # UI layout
├── renderer.js          # Frontend logic + events
├── package.json         # Scripts + build config
└── assets/
    ├── icon.png
    └── icon.ico

🧩 Build Options
Command	Description
npm start	Run in development mode
npm run pack	Package raw build folder
npm run dist	Create Windows installer (NSIS)
⚠️ Important Disclaimer

This tool uses WhatsApp Web automation (whatsapp-web.js).
It is not officially endorsed by WhatsApp Inc.
Sending unsolicited / bulk spam messages can violate WhatsApp’s Terms of Service.
Use for personal or authorized business communication only.
The developer assumes no responsibility for misuse.

```
---

## 🚀 Features

- Secure **QR Login** (LocalAuth saves session)
- **CSV Import + Auto Number Cleaning**
- **Preview Contacts** before sending
- **Send Text + Media (Images / Videos / Docs)**
- **Smart Random Delay System** (Anti-ban friendly)
- **Pause / Resume / Stop During Sending**
- **Real-Time Logs + Progress Bar**
- Clean, **Modern Dark UI**
- Works on **Windows / Mac / Linux**

---

## 🧰 Tech Stack
| Component | Technology |
|---|---|
| Desktop Framework | Electron |
| WhatsApp Control | whatsapp-web.js |
| UI | HTML + CSS + JS |
| Data | CSV Parser + QRCode |
| Packaging | Electron Builder (NSIS Installer) |

---

## 📦 Installation

```bash
git clone https://github.com/YOUR-USERNAME/mass-sender-pro
cd mass-sender-pro
npm install
npm start
```

---

## 🏗️ Build Windows Installer

```bash
npm run dist
```
Installer will be created in the **dist/** folder.

---

## 🖥️ How To Use

1. Open app → Scan QR with your phone WhatsApp
2. Click **Import CSV** and choose your contacts file
3. Write your **message**
4. (Optional) Attach media file
5. Set **Delay (ms)** — recommended 3000-7000
6. Hit **Start**
7. Watch **progress + live logs**
8. You can **Pause**, **Resume**, or **Stop** anytime

---

## 📌 CSV Format Example

```
+919876543210
918765432109
+441234567890
```

- No header required
- One number per line
- App auto-cleans spaces, +, etc.

---

## ⚠️ Disclaimer

This project uses **WhatsApp Web automation** via `whatsapp-web.js`.  
This is **not an official WhatsApp product**.

- Do **not** use for spam
- Only send to **consenting users**
- Use responsibly or your number **may get restricted**

---

## 🌟 Roadmap

- Variable Messages (e.g. `Hi {Name}`)
- Delivery Reports
- Multi-Account Switching
- UI Themes
- Analytics Dashboard

---

## 🤝 Contributing

```bash
git checkout -b feature-name
git commit -m "added new feature"
git push origin feature-name
```
Then create a Pull Request ✅

---

## 📜 License
This project is licensed under the **MIT License**.

---

## ✨ Credits
Built with ❤️ using:
- **whatsapp-web.js** by Pedro López
- **Electron**
