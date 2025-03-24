
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

// ✅ Inject app version into a <meta> tag at runtime
const metaTag = document.createElement('meta');
metaTag.name = 'app-version';
metaTag.content = __APP_VERSION__;
document.head.appendChild(metaTag);

// ✅ Version check logic
const htmlVersion = document.querySelector('meta[name="app-version"]')?.content;
const storedVersion = localStorage.getItem('app_version');

if (storedVersion && storedVersion !== htmlVersion) {
  console.warn('[App] Version mismatch. Clearing cache and reloading...');
  localStorage.clear();
  caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
  location.reload(true);
}

localStorage.setItem('app_version', htmlVersion);
