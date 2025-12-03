import { decideWinner } from "../../helpers";
import { INIT_COUNT } from "../../hooks/useGame";
import type { Player, Choice } from "../../types";
import Controls from "../Controls/Controls";
import rock from "../../assets/rock.png";
import paper from "../../assets/paper.png";
import scissors from "../../assets/ciss.png";

export const GamePlay: React.FC<{
  p1: Player;
  p2: Player;
  countdown: number;
  currentRound: number;
  totalRounds: number;
  pick: (playerId: "p1" | "p2", c: Choice) => void;
  nextRound: () => void;
}> = ({ p1, p2, countdown, currentRound, totalRounds, pick, nextRound }) => {
  const result =
    p1.choice && p2.choice ? decideWinner(p1.choice, p2.choice) : null;
  let resultText: string | null = null;
  if (result) {
    if (result === "draw") resultText = "it's a tie, another one ?";
    else if (result === "p1") resultText = "You won !";
    else resultText = "You lost";
  }

  return (
    <div>
      <h1>Rock • Paper • Scissors</h1>
      <div className="round-info">
        <p>
          Round {currentRound} of {totalRounds}
        </p>
        <div className="round-info-wrapper">
          <div className="round-info-player">
            <p className="player-name">{p1.name}</p>
            <p className="player-score">{p1.score}</p>
          </div>
          <span className="separator">-</span>
          <div className="round-info-player">
            <p className="player-name">{p2.name}</p>
            <p className="player-score">{p2.score}</p>
          </div>
        </div>
      </div>

      <div className="scoreboard game-board">
        <div className="results-panel" aria-live="polite">
          {p1.choice && p2.choice && countdown === 0 ? (
            <div className="opponent-choice">
              <img
                src={{ rock, paper, scissors }[p2.choice]}
                alt={p2.choice}
                className="choice-display"
              />
              {p1.choice && p2.choice && result && resultText ? (
                <output className="result-text" aria-live="polite">
                  {resultText}
                </output>
              ) : null}
              {currentRound < totalRounds && (
                <button className="next-round-button" onClick={nextRound}>
                  Next Round
                </button>
              )}
            </div>
          ) : (
            <div className="opponent-wait">
              {p1.choice ? (
                <div className="countdown-number" aria-live="polite">
                  {countdown ?? INIT_COUNT}
                </div>
              ) : (
                <div className="waiting-text">Pick your arm</div>
              )}
            </div>
          )}
        </div>

        <div className="controls-bottom">
          <Controls
            onPick={(c: Choice) => pick("p1", c)}
            disabled={!!p1.choice && !p2.choice}
            selected={p1.choice}
            highlightSelected={!!p1.choice && !!p2.choice}
          />
        </div>
      </div>
    </div>
  );
};
