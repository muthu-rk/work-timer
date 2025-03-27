
import React, { useState, useEffect, useRef } from "react";

export default function ChessClock({ player1, player2, theme, onCancel }) {
    const [player1Time, setPlayer1Time] = useState(player1.time * 60);
    const [player2Time, setPlayer2Time] = useState(player2.time * 60);
    const [activePlayer, setActivePlayer] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const bellTimeoutRef = useRef(null);
    const tickSound = useRef(null);
    const bellSound = useRef(null);
    const bellPlayedRef = useRef(false);
    const timerWorker = useRef(null);

    const player1TimeRef = useRef(player1.time * 60);
    const player2TimeRef = useRef(player2.time * 60);

    const isPausedRef = useRef(isPaused);
    const activePlayerRef = useRef(activePlayer);
    const lastTickRef = useRef(Date.now());

    const debugMode = false;

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        activePlayerRef.current = activePlayer;
    }, [activePlayer]);

    useEffect(() => {
        document.body.className = theme;
        return () => clearTimeout(bellTimeoutRef.current);
    }, [theme]);

    useEffect(() => {
        try {
        timerWorker.current = new Worker(new URL('./timer-worker.js', import.meta.url), { type: 'module' });
        } catch (err) {
            alert("⚠️ Timer worker failed to start.");
            console.error(err);
            return;
          }
          
        timerWorker.current.onmessage = (e) => {
            if (e.data.type === "tick") {
                const now = e.data.timestamp;
                const elapsed = Math.floor((now - lastTickRef.current) / 1000);
                lastTickRef.current = now;

                if (!isPausedRef.current && activePlayerRef.current === 1) {
                    if (player1TimeRef.current > 0) {
                        player1TimeRef.current = Math.max(0, player1TimeRef.current - elapsed);
                        setPlayer1Time(player1TimeRef.current);

                        if (player1TimeRef.current === 0 && !bellPlayedRef.current) {
                                bellPlayedRef.current = true;
                            bellSound.current?.play().catch(console.error);
                                stopBellAfterDelay();
                                alert(`${player1.name || "Player 1"} ran out of time!`);
                            setIsPaused(true);
                        }
                    }
                }

                if (!isPausedRef.current && activePlayerRef.current === 2) {
                    if (player2TimeRef.current > 0) {
                        player2TimeRef.current = Math.max(0, player2TimeRef.current - elapsed);
                        setPlayer2Time(player2TimeRef.current);

                        if (player2TimeRef.current === 0 && !bellPlayedRef.current) {
                                bellPlayedRef.current = true;
                            bellSound.current?.play().catch(console.error);
                                stopBellAfterDelay();
                                alert(`${player2.name || "Player 2"} ran out of time!`);
                            setIsPaused(true);
                        }
                    }
                }
            }
        };

        // 🔧 Debug mode: simulate system sleep/resume
        if (debugMode) {
            window.addEventListener("keydown", (e) => {
                if (e.key === "d" || e.key === "D") {
                    const skipSeconds = 120; // simulate 2 minutes
                    const now = Date.now();
                    lastTickRef.current = now - skipSeconds * 1000;
                    alert(`[Debug] Simulated resume after ${skipSeconds} seconds.`);
                }
            });
        }

        return () => {
            timerWorker.current?.postMessage({ action: 'stop' });
            timerWorker.current?.terminate();
        };
    }, []);

    useEffect(() => {
        if (timerWorker.current) {
            if (!isPaused && activePlayer !== null) {
                lastTickRef.current = Date.now();
                timerWorker.current.postMessage({ action: 'start' });
            } else {
                timerWorker.current.postMessage({ action: 'stop' });
            }
        }
    }, [isPaused, activePlayer]);

    const stopBellAfterDelay = () => {
        if (bellSound.current) {
            bellTimeoutRef.current = setTimeout(() => {
                bellSound.current.pause();
                bellSound.current.currentTime = 0;
            }, 5000);
        }
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const getColorClass = (remaining, total) => {
        const percentage = remaining / total;
        if (percentage <= 0) return "green";
        if (percentage <= 0.1) return "pink";
        if (percentage <= 0.5) return "yellow";
        return "green";
    };

    const togglePlayer = () => {
        if (player1TimeRef.current === 0 || player2TimeRef.current === 0) return;
        setActivePlayer(prev => (prev === 1 ? 2 : 1));
        setIsPaused(false);
        tickSound.current?.play();
        navigator.vibrate?.(100);
    };

    const handlePlay = () => {
        if (activePlayer === null) setActivePlayer(1);
        setIsPaused(false);
    };

    const handlePause = () => setIsPaused(true);

    const handleReset = () => {
        setPlayer1Time(player1.time * 60);
        setPlayer2Time(player2.time * 60);
        player1TimeRef.current = player1.time * 60;
        player2TimeRef.current = player2.time * 60;
        setActivePlayer(null);
        setIsPaused(true);
        bellPlayedRef.current = false;
    };

    const total1 = player1.time * 60;
    const total2 = player2.time * 60;

    return (
        <div className="timer-screen">
            <audio ref={tickSound} src={`${import.meta.env.BASE_URL}tick.mp3`} preload="auto" />
            <audio ref={bellSound} src={`${import.meta.env.BASE_URL}bell.mp3`} preload="auto" />
            <div className="timer-buttons">
                <button onClick={handlePlay}>▶</button>
                <button onClick={handlePause}>⏸</button>
                <button onClick={handleReset}>🔄</button>
                <button onClick={onCancel}>🚫</button>
            </div>

            <div className="timers">
                <div className="timer-column">
                    <div className="timer-name">{player1.name || "Player 1"}</div>
                    <div
                        className={`timer-block ${activePlayer === 1 ? getColorClass(player1Time, total1) : 'gray'}`}
                        style={{ position: "relative" }}
                        title={`${Math.round((player1Time / total1) * 100)}% Remaining`}
                        onClick={activePlayer === 1 ? togglePlayer : undefined}
                    >
                        {formatTime(player1Time)}
                        <div
                            className="progress-bar"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                height: "4px",
                                backgroundColor: "deepskyblue",
                                width: `${(player1Time / total1) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="timer-column">
                    <div className="timer-name">{player2.name || "Player 2"}</div>
                    <div
                        className={`timer-block ${activePlayer === 2 ? getColorClass(player2Time, total2) : 'gray'}`}
                        style={{ position: "relative" }}
                        title={`${Math.round((player2Time / total2) * 100)}% Remaining`}
                        onClick={activePlayer === 2 ? togglePlayer : undefined}
                    >
                        {formatTime(player2Time)}
                        <div
                            className="progress-bar"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                height: "4px",
                                backgroundColor: "red",
                                width: `${(player2Time / total2) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
