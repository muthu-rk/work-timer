
import React from "react";
import ReactDOM from "react-dom/client";
import StartScreen from "./StartScreen";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StartScreen />
    </React.StrictMode>
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).then(reg => {
        reg.onupdatefound = () => {
          const newSW = reg.installing;
          newSW.onstatechange = () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              console.log("[SW] New version available. Reloading...");
              window.location.reload();
            }
          };
        };
      });
    });
  }

// ✅ Version Check to force reload on deploy
async function checkAppVersion() {
  try {
    const res = await fetch('/work-timer/version.json', { cache: 'no-cache' });
    const { version: latest } = await res.json();
    const current = localStorage.getItem('app_version');

    if (current && current !== latest) {
      console.warn('[App] Version changed. Clearing cache and reloading...');
      localStorage.clear();
      caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
      location.reload(true);
    }

    localStorage.setItem('app_version', latest);
  } catch (err) {
    console.error('[App] Failed to check app version', err);
  }
}
checkAppVersion();
