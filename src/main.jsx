
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
  