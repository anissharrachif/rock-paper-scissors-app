export type Choice = "rock" | "paper" | "scissors" | null;

export interface Player {
  id: "player1" | "player2" | "computer";
  name: string;
  score: number;
  choice: Choice;
}
