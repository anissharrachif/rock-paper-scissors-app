import React, { useEffect, useState } from "react";
import type { Choice, Player } from "../../types";
import { GamePlay } from "./GamePlay";

interface BoardProps {
  p1: Player;
  p2: Player;
  countdown: number;
  setCountdown: (i: number | ((prev: number) => number)) => void;
  pick: (playerId: "p1" | "p2", c: Choice) => void;
  totalRounds: number;
  currentRound: number;
  gameStarted: boolean;
  startGame: (rounds: number) => void;
  nextRound: () => void;
  resetMatch: () => void;
}

const RoundsSetup: React.FC<{
  roundsInput: number;
  setRoundsInput: (rounds: number) => void;
  startGame: (rounds: number) => void;
}> = ({ roundsInput, setRoundsInput, startGame }) => (
  <div>
    <h1>Rock • Paper • Scissors</h1>
    <div className="rounds-setup">
      <h2>Please, select the number of rounds</h2>
      <div className="rounds-options">
        {[3, 5, 7, 9].map((num) => (
          <button
            key={num}
            className={`rounds-button ${roundsInput === num ? "active" : ""}`}
            onClick={() => setRoundsInput(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="start-button" onClick={() => startGame(roundsInput)}>
        Start Game
      </button>
    </div>
  </div>
);

const MatchOver: React.FC<{
  p1: Player;
  p2: Player;
  resetMatch: () => void;
}> = ({ p1, p2, resetMatch }) => {
  const winner = p1.score > p2.score ? p1.name : p2.name;
  return (
    <div>
      <h1>Rock • Paper • Scissors</h1>
      <div className="match-over">
        <h2>{winner} wins the match!</h2>
        <p>
          {p1.name}: {p1.score} - {p2.name}: {p2.score}
        </p>
        <button className="reset-button" onClick={resetMatch}>
          Play Again
        </button>
      </div>
    </div>
  );
};

const Board: React.FC<BoardProps> = ({
  p1,
  p2,
  pick,
  setCountdown,
  countdown,
  totalRounds,
  currentRound,
  gameStarted,
  startGame,
  nextRound,
  resetMatch,
}) => {
  const [roundsInput, setRoundsInput] = useState(5);

  useEffect(() => {
    if (!p1.choice) {
      globalThis.setTimeout(() => setCountdown(3));
      return;
    }
    const startTimer = globalThis.setTimeout(() => setCountdown(3));
    const intervalId = setInterval(() => {
      setCountdown((c) => (c > 1 ? c - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (startTimer) globalThis.clearTimeout(startTimer as unknown as number);
    };
  }, [p1.choice, setCountdown]);

  if (!gameStarted) {
    return (
      <RoundsSetup
        roundsInput={roundsInput}
        setRoundsInput={setRoundsInput}
        startGame={startGame}
      />
    );
  }

  const isMatchOver = p1.score > totalRounds / 2 || p2.score > totalRounds / 2;

  if (isMatchOver) {
    return <MatchOver p1={p1} p2={p2} resetMatch={resetMatch} />;
  }

  return (
    <GamePlay
      p1={p1}
      p2={p2}
      countdown={countdown}
      currentRound={currentRound}
      totalRounds={totalRounds}
      pick={pick}
      nextRound={nextRound}
    />
  );
};

export default Board;
