import { useState } from "react";
import Board from "./components/Board";
import "./styles/main.scss";
import type { Player } from "./types";

function App() {
  const [p1, setP1] = useState<Player>({
    id: "player1",
    name: "Player 1",
    score: 0,
    choice: null,
  });
  const [p2, setP2] = useState<Player>({
    id: "player2",
    name: "Player 2",
    score: 0,
    choice: null,
  });
  const [mode, setMode] = useState<string>("");

  function reset() {
    setP1((s) => ({ ...s, lastChoice: null, score: 0 }));
    setP2((s) => ({ ...s, lastChoice: null, score: 0 }));
  }

  return (
    <div>
      <h1>Rock • Paper • Scissors</h1>
      <div className="modes">
        <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
          <option value="1">Player vs Player</option>
          <option value="2">Player vs Computer</option>
          <option value="3">Computer vs Computer</option>
        </select>
        <button onClick={reset}>Reset</button>
      </div>
      <div>
        <Board p1={p1} p2={p2} />
      </div>
    </div>
  );
}

export default App;
