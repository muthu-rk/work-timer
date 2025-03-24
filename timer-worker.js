// public/timer-worker.js
let intervalId = null;

self.onmessage = function (e) {
  const { action } = e.data;

  if (action === "start") {
    if (!intervalId) {
      intervalId = setInterval(() => {
        self.postMessage({ type: "tick", timestamp: Date.now() });
      }, 1000);
    }
  } else if (action === "stop") {
    clearInterval(intervalId);
    intervalId = null;
  }
};
