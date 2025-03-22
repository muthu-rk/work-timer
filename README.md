# Chess Clock ⏱️

> This app was developed using **vibe coding** 🌀

🧠 Inspired by [The Chess Timer Method – Boost Focus and Productivity](https://www.noisli.com/blog/the-chess-timer-method/), this app adapts the idea of switching focused work sessions between two people or tasks using a chess clock-like approach.

Learn how using a chess timer helps you:
- Structure focused time between tasks
- Stay accountable in pair programming or meetings
- Create fairness in speaking time
- Minimize overthinking and interruptions

---

## 🌐 Try it Live

👉 **[Launch the Chess Clock App](https://muthu-rk.github.io/work-timer/)**  
No install required — runs directly in your browser.

---

## 📲 How to Install as a PWA

### On Mobile (Android/iOS)

1. Open [https://muthu-rk.github.io/work-timer/](https://muthu-rk.github.io/work-timer/)
2. Tap the browser menu (`⋮` on Android, `Share` on iOS)
3. Select **“Add to Home Screen”**
4. Launch from your home screen like a native app

### On Desktop (Chrome/Edge)

1. Open the app in your browser
2. Click the install icon (🔽) in the address bar
3. Confirm install — now launches in its own window

Once installed:
- Works offline
- Fullscreen experience
- Auto-updates on new deploys

---

## 🧑‍💻 Development

### Prerequisites
- Node.js >= 16
- npm

### Setup & Run Dev Server

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

---

## 📦 Build & Preview Locally

```bash
npm run build
npm run preview
```

---

## ☁️ Deploy to GitHub Pages

### 1. Set correct base path in `vite.config.js`

```js
export default defineConfig({
  base: '/<your-repo-name>/',
  ...
});
```

Example:
```js
base: '/work-timer/',
```

### 2. Add deploy scripts to `package.json`

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 3. Deploy 🚀

```bash
npm run deploy
```

App will be live at:

```
https://<your-username>.github.io/<your-repo-name>/
```

---

## 📲 PWA Tips

- Add `icon-192.png` and `icon-512.png` to `public/`
- Manifest and service worker are already configured
- Auto-refresh is built in — bump `CACHE_VERSION` in `service-worker.js` on deploy

---

## 🤝 Contributing

Feel free to fork and enhance it — multiplayer mode, buzzer settings, etc. PRs welcome!

---

## 🌀 Built with vibe coding
Because code should feel good.

Happy clocking ♟️⏳
