
import React, { useState, useEffect } from "react";
import ChessClock from "./ChessClock";

export default function StartScreen() {
    const DEFAULT_TIME = 15;

    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player1Time, setPlayer1Time] = useState(DEFAULT_TIME);
    const [player2Time, setPlayer2Time] = useState(DEFAULT_TIME);
    const [theme, setTheme] = useState("dark");
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleStart = () => {
        if (player1Time <= 0 || player2Time <= 0) {
            alert("Please enter valid time values!");
            return;
        }
        setGameStarted(true);
    };

    return gameStarted ? (
        <ChessClock
            player1={{ name: player1Name || "Player 1", time: player1Time }}
            player2={{ name: player2Name || "Player 2", time: player2Time }}
            theme={theme}
            onCancel={() => setGameStarted(false)}
        />
    ) : (
        <div className="container">
            <div className="top-bar">
                <button
                    className="toggle-btn"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            <h1>Chess Clock Setup</h1>

            <div className="input-group" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    Player 1 Name:
                    <input
                        type="text"
                        placeholder="Player 1"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                    />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    Time (in mins):
                    <input
                        type="number"
                        value={player1Time}
                        onChange={(e) => setPlayer1Time(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <div className="input-group" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    Player 2 Name:
                    <input
                        type="text"
                        placeholder="Player 2"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                    />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    Time (in mins):
                    <input
                        type="number"
                        value={player2Time}
                        onChange={(e) => setPlayer2Time(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <button className="start-btn" onClick={handleStart}>
                Start Game
            </button>
        </div>
    );
}
