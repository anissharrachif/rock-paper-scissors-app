export type Choice = "rock" | "paper" | "scissors" | null;

export interface Player {
  id: string;
  name: string;
  score: number;
  choice: Choice;
}

export interface GameConfig {
  totalRounds: number;
}
