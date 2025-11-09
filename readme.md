# 🔥 Mass Sender — Electron App
> A sleek, Electron-based bulk WhatsApp sender with an **overpowered UI** (neon + glassmorphism) — built for fast contact uploads, message templates, and QR-session persistence.

[![Repo Size](https://img.shields.io/github/repo-size/akshayxt/mass-sender-electron)](https://github.com/akshayxt/mass-sender-electron)
[![License](https://img.shields.io/github/license/akshayxt/mass-sender-electron)](https://github.com/akshayxt/mass-sender-electron/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/akshayxt/mass-sender-electron)](https://github.com/akshayxt/mass-sender-electron/issues)

---

## 🚀 What is this
Mass Sender is a desktop Electron app that uses `whatsapp-web.js` to send bulk messages from a local WhatsApp Web session. It focuses on reliability and a modern, eye-catching UI to make mass messaging fast and comfortable.

---

## ✨ Key features
- QR-based WhatsApp Web login (session persisted with `LocalAuth`)
- Bulk contact CSV import (international format support)
- Message templates with simple personalization
- Simple UI with neon/glass aesthetic (customizable)
- Cross-platform: Windows / macOS / Linux (Electron)

---

## 🖼️ Demo
> Add your demo GIF or screenshot here (use `/assets/demo.gif` or link to a hosted image).  
Example:
```md
![Demo](assets/demo.gif)

mass-sender-electron/
├─ main.js
├─ preload.js
├─ renderer.html
├─ renderer.js
├─ contacts.csv
├─ package.json
└─ readme.md

```
Commands to install

```
git clone https://github.com/akshayxt/mass-sender-electron.git
cd mass-sender-electron
```

Install & run:

```
npm install
npm start
```

*🧾 CSV format (contacts.csv)*

Use international phone format (E.164 without + or with + — both handled). Example CSV:

name,phone,extra
Akshay,919876543210,VIP
Raxx,447700900000,TestUser



Tips:

Ensure no BOM or hidden characters.

For large files (>5k rows) split into chunks to avoid session issues.

If upload fails: open devtools in the app (Menu → Toggle DevTools) and check console logs for parse errors.



*⚙️ App Usage*

Start app, scan QR code with your phone (WhatsApp Web).

Wait for session to authenticate (LocalAuth stores session).

Import contacts.csv.

```
Write/paste a message template. Use {{name}} to personalize:

Hi {{name}}, this is a test message from Mass Sender.

```

*🧩 Overpower UI — Neon + Glass quick guide*


> Use this small CSS snippet inside renderer.html or a CSS file to get the neon, glass look:

```
:root{
  --bg:#05040a;
  --panel: rgba(255,255,255,0.04);
  --glass: rgba(255,255,255,0.06);
  --accent1: linear-gradient(90deg, #7afcff, #528bff);
  --accent2: linear-gradient(90deg, #ff4d6d, #ff9a4d);
  --neon: #7afcff;
}

body{
  background: radial-gradient(1200px 600px at 10% 20%, rgba(82,139,255,0.06), transparent 10%),
              radial-gradient(1000px 400px at 90% 80%, rgba(255,77,109,0.04), transparent 10%),
              var(--bg);
  color: #e6eef7;
  font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
  -webkit-font-smoothing:antialiased;
  margin:0; padding:24px;
}

.card{
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: 14px;
  box-shadow: 0 6px 40px rgba(0,0,0,0.6), 0 0 18px rgba(122,252,255,0.06) inset;
  border: 1px solid rgba(122,252,255,0.06);
  padding:18px;
}

.btn-neon{
  padding:10px 16px;
  border-radius: 12px;
  font-weight:600;
  background: var(--accent1);
  box-shadow: 0 6px 20px rgba(82,139,255,0.18), 0 0 18px rgba(122,252,255,0.08);
  border: none;
  cursor: pointer;
  color: #021027;
}

.qr-frame{
  padding:12px;
  border-radius:12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  display:inline-block;
  box-shadow:0 10px 30px rgba(0,0,0,0.55);
}
```
*Quick HTML layout (renderer)*


```
<div class="container">
  <div class="card" style="display:flex;gap:18px;align-items:flex-start;">
    <div>
      <div class="qr-frame">
        <!-- QR canvas inserted by your renderer -->
        <canvas id="qrCanvas"></canvas>
      </div>
      <p>Scan with WhatsApp</p>
    </div>

    <div style="flex:1">
      <input id="csvUpload" type="file" accept=".csv" />
      <textarea id="message" placeholder="Type message with {{name}}"></textarea>
      <button class="btn-neon" id="sendBtn">Send</button>
    </div>
  </div>
</div>
```

/🐞 Troubleshooting — Contact upload not working?*

Common causes & fixes:

CSV encoding: Save as UTF-8 without BOM.

Delimiter mismatch: Ensure commas, not semicolons.

Phone formatting: Use country code (E.164) — e.g., 919876543210 for India.

Large file: Browser/Electron memory issues — split file, or stream-parse.

Console logs: Open DevTools and search for parse errors. Add console.log in CSV parse callback to print loaded rows.

Permissions: Windows Defender/Anti-virus sometimes blocks file reads — allow Electron in AV.

Quick parse snippet for robust CSV loading (use csv-parser or papaparse):


```
// Example using PapaParse in renderer
Papa.parse(file, {
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log('rows', results.data.length);
    // validate phone column and normalize
  }
});
```

✅ Security & Ethics

This tool interfaces with WhatsApp Web. Respect recipients’ consent and privacy.

Abide by WhatsApp terms of service; do not use for spam or unlawful activity.

🤝 Contributing

Wanted: UI polish, better CSV validation, rate-limit handling, packaging script.

Fork repo.

Create branch: feature/awesome-ui

Open PR with description & demo GIF.

📬 Contact / Credits

Created by akshayxt.
If you want help customizing UI, packaging, or adding features — open an issue or contact via your GitHub profile.

🧾 License

Add your license file (e.g., MIT). If none exists, consider adding LICENSE with MIT.

📌 Final tips to make it "overpowered"

Use Tailwind + custom CSS variables for fast theming.

Add animated micro-interactions with framer-motion (in React) or CSS keyframes.

Use LocalAuth from whatsapp-web.js so users don’t re-scan often.

Add an Export Logs button to help debug failed sends.


If you'd like, I can:
- convert the “Overpower UI” snippet into a ready-to-drop `styles.css`,  
- or create a polished `README` image / demo GIF placeholder and show how to embed it.

Which one do you want next? (I’ll paste the file-ready content directly — no fuss.)
::contentReference[oaicite:0]{index=0}


