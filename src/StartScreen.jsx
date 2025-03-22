
import React, { useState, useEffect } from "react";
import ChessClock from "./ChessClock";

export default function StartScreen() {
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player1Time, setPlayer1Time] = useState(240); // default 4 hours
    const [player2Time, setPlayer2Time] = useState(240);
    const [theme, setTheme] = useState("light");
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
                <button className="toggle-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            <h1>Chess Clock Setup</h1>

            <div>
                <input type="text" placeholder="Player 1 Name" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} />
                <input type="number" min="1" placeholder="Time (min)" value={player1Time} onChange={(e) => setPlayer1Time(Number(e.target.value))} />
            </div>

            <div>
                <input type="text" placeholder="Player 2 Name" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} />
                <input type="number" min="1" placeholder="Time (min)" value={player2Time} onChange={(e) => setPlayer2Time(Number(e.target.value))} />
            </div>

            <button onClick={handleStart}>Start Game</button>
        </div>
    );
}
