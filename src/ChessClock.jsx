
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

    useEffect(() => {
        document.body.className = theme;
        return () => clearTimeout(bellTimeoutRef.current);
    }, [theme]);

    useEffect(() => {
        if (!isPaused && activePlayer !== null) {
            const timer = setInterval(() => {
                if (activePlayer === 1) {
                    setPlayer1Time(prev => {
                        if (prev <= 1) {
                            if (!bellPlayedRef.current && bellSound.current && bellSound.current.paused) {
                                bellPlayedRef.current = true;
                                bellSound.current.play().catch(console.error);
                                stopBellAfterDelay();
                            }
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    setPlayer2Time(prev => {
                        if (prev <= 1) {
                            if (!bellPlayedRef.current && bellSound.current && bellSound.current.paused) {
                                bellPlayedRef.current = true;
                                bellSound.current.play().catch(console.error);
                                stopBellAfterDelay();
                            }
                            return 0;
                        }
                        return prev - 1;
                    });
                }
            }, 1000);
            return () => clearInterval(timer);
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
        if (player1Time === 0 || player2Time === 0) return;
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
        setActivePlayer(null);
        setIsPaused(true);
        bellPlayedRef.current = false; // ✅ Reset bell trigger
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
