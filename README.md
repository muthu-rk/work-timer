# Chess Clock ⏱️

> This app was developed using **vibe coding** 🌀

A minimalist, offline-capable **progressive web app (PWA)** chess clock built using **React + Vite**. Ideal for casual or tournament-style play with visual time warnings and sound cues.

---

## 🚀 Features

- ⚡ Fast, lightweight, installable as a PWA
- 🟢 Dynamic color indicators: green → yellow → pink → gray
- 🔔 Tick sound on player switch, bell on timeout (stops after 5s)
- 🎨 Light/dark theme support
- 🔄 Auto-refreshes after updates (no stale cache)
- 📴 Works fully offline after install

---

## 🌐 Try it Live

👉 **[Launch the Chess Clock App](https://muthu-rk.github.io/work-timer/)**

No install required — runs directly in your browser.

---

## 📲 How to Install as a PWA

### On Mobile (Android/iOS)

1. Open the app in your browser:
   [https://muthu-rk.github.io/work-timer/](https://muthu-rk.github.io/work-timer/)
2. Tap the browser menu (`⋮` on Android, `Share` on iOS)
3. Select **“Add to Home Screen”**
4. Launch the app from your home screen like a native app

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
