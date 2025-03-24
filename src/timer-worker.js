// public/timer-worker.js
let intervalId = null;

self.onmessage = function (e) {
  const { action } = e.data;

  if (action === "start") {
    if (!intervalId) {
      intervalId = setInterval(() => {
        const now = Date.now();
        self.postMessage({ type: "tick", timestamp: now });
        console.log("[Worker] Tick at", new Date(now).toISOString()); // ✅ Proof of life
      }, 1000);
    }
  } else if (action === "stop") {
    clearInterval(intervalId);
    intervalId = null;
  }
};
