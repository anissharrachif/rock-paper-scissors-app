import type { Choice } from "../types";

export const GAME_STATES = {
  DRAW: "draw",
  LOST: "lost",
  WIN: "win",
};

export type GAME_STATE = (typeof GAME_STATES)[keyof typeof GAME_STATES];

export function decideWinner(a: Choice, b: Choice) {
  if (a === b) return GAME_STATES.DRAW;
  const p1Wins =
    (a === "rock" && b === "scissors") ||
    (a === "scissors" && b === "paper") ||
    (a === "paper" && b === "rock");

  return p1Wins ? "p1" : "p2";
}
