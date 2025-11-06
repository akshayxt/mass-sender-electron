# WhatsApp Mass Sender (JavaFX)

A lightweight desktop app that allows you to:

* Import contacts from any `.csv` file (Google Contacts compatible)
* Automatically clean & convert numbers to **International E.164 Format**
* Compose a text message and optionally attach media
* Export a cleaned list as `cleaned_contacts.csv`

> **Note:** Messaging backend (WhatsApp Web automation) will be added later.

---

## 🖥️ Requirements

| Component | Version      |
| --------- | ------------ |
| **Java**  | 17 or higher |
| **React** | 3.8+         |

---

## 📦 Setup Instructions

### 1. Clone / Download Project

```
git clone
npm install --save-dev electron
npm start
```

### 2. Build Project

```
mvn clean package
```

### 3. Run Application

```
java -jar target/mass-sender-javafx-1.0.0-jar-with-dependencies.jar
```

---

## 📁 How to Use

### 1. Import Contacts

* Click **"Choose CSV"**
* Select any `.csv` file containing phone numbers
* App will **auto-detect & convert** to safe international format

### 2. Compose Message

* Write your message in text box
* (Optional) Attach an image/video file

### 3. Export Clean List

* Click **"Export cleaned_contacts.csv"**
* This file will be used for sending messages later

---

## 📱 CSV Format Supported

```
+1 415 555 1212
+91-98765-43210
0044 7911 123456
9876543210
```

All formats are automatically normalized.

---

## 🔧 Future Features (Coming Soon)

* Built-in WhatsApp Web QR login
* Show profile name & picture after login
* Send text + media to all contacts with smart delay
* Delivery report & logs

---

## 🤝 Contributing

Pull Requests are welcome.

---

## 📄 License

This project is open-source and free to modify and use.
