import { useState } from "react";
import type { Player, Choice } from "../types";

export const INIT_COUNT = 3;
export const useGame = () => {
  const [p1, setP1] = useState<Player>({
    id: "saitama",
    name: "Saitama",
    score: 0,
    choice: null,
  });
  const [p2, setP2] = useState<Player>({
    id: "cpu",
    name: "CPU",
    score: 0,
    choice: null,
  });

  const [countdown, setCountdown] = useState(INIT_COUNT);

  function resetGame() {
    setCountdown(INIT_COUNT);
    setP1((s) => ({ ...s, choice: null }));
    setP2((s) => ({ ...s, choice: null }));
  }

  const pickRandom = () => {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const res = choices[Math.floor(Math.random() * 3)];
    setP2((prv) => ({ ...prv, choice: res }));
  };

  function pick(playerId: "p1" | "p2", choice: Choice) {
    if (playerId === "p1") {
      resetGame();
      pickRandom();
      setP1((s) => ({ ...s, choice: choice }));
    }
    if (playerId === "p2") {
      setP2((s) => ({ ...s, choice: choice }));
    }
  }

  return { p1, p2, countdown, setCountdown, pick, resetGame };
};
