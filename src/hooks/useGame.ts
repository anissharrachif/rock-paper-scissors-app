import { useState } from "react";
import type { Player, Choice } from "../types";
import { decideWinner } from "../helpers";

export const INIT_COUNT = 3;
export const useGame = () => {
  const [p1, setP1] = useState<Player>({
    id: "you",
    name: "YOU",
    score: 0,
    choice: null,
  });
  const [p2, setP2] = useState<Player>({
    id: "cpu",
    name: "SAITAMA [CYBORG]",
    score: 0,
    choice: null,
  });

  const [countdown, setCountdown] = useState(INIT_COUNT);
  const [totalRounds, setTotalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  function resetGame() {
    setCountdown(INIT_COUNT);
    setP1((s) => ({ ...s, choice: null }));
    setP2((s) => ({ ...s, choice: null }));
  }

  function resetMatch() {
    setCurrentRound(1);
    setP1((s) => ({ ...s, score: 0, choice: null }));
    setP2((s) => ({ ...s, score: 0, choice: null }));
    setCountdown(INIT_COUNT);
    setGameStarted(false);
  }

  function startGame(rounds: number) {
    setTotalRounds(rounds);
    setGameStarted(true);
    setCurrentRound(1);
  }

  function nextRound() {
    if (currentRound < totalRounds) {
      setCurrentRound((prev) => prev + 1);
      resetGame();
    }
  }

  const pickRandom = () => {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const res = choices[Math.floor(Math.random() * 3)];
    return res;
  };

  function updateScores(playerChoice: Choice, cpuChoice: Choice) {
    const result = decideWinner(playerChoice, cpuChoice);
    if (result === "p1") {
      setP1((prev) => ({ ...prev, score: prev.score + 1 }));
    } else if (result === "p2") {
      setP2((prev) => ({ ...prev, score: prev.score + 1 }));
    }
  }

  function pick(playerId: "p1" | "p2", choice: Choice) {
    if (playerId === "p1") {
      resetGame();
      const cpuChoice = pickRandom();
      setP1((s) => ({ ...s, choice: choice }));
      setP2((s) => ({ ...s, choice: cpuChoice }));

      setTimeout(() => {
        if (choice && cpuChoice) {
          updateScores(choice, cpuChoice);
        }
      }, 4000);
    }
  }

  return {
    p1,
    p2,
    countdown,
    setCountdown,
    pick,
    resetGame,
    totalRounds,
    setTotalRounds,
    currentRound,
    setCurrentRound,
    gameStarted,
    startGame,
    nextRound,
    resetMatch,
  };
};
