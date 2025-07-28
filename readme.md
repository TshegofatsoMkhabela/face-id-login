# 🧠 Face Login ID

A simple browser-based face recognition login system powered by Node.js, Express, and face-api.js.

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone ...
cd face-login-id
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Backend Server

```bash
npm run dev
```

### 4. Open the Frontend

- Open `public/index.html` in **VSCode**
- Right-click on the file and choose **"Open with Live Server"**
- This will launch the app in your

## ✅ Make sure to **allow camera access** when prompted — face recognition won’t work otherwise.

## Search up faces of Curry or Jordan and hold it up to camera to test it

### 4. To add your own faces

- Open `images/`
- add your photo there
- open `public/scripts.js`
- at `scripts.js:18` line 18
- add your json object with label name and image url to const knownFaces

```
ie `http://127.0.0.1:5500/testing-face-id/face-api-webcam-final/public/images/blue-profile.jpg`
```
