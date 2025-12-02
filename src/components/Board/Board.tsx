import React, { useEffect } from "react";
import type { Choice, Player } from "../../types";
import Controls from "../Controls/Controls";
import rock from "../../assets/rock.png";
import paper from "../../assets/paper.png";
import scissors from "../../assets/ciss.png";
import { decideWinner } from "../../helpers";
import { INIT_COUNT } from "../../hooks/useGame";

const Board: React.FC<{
  p1: Player;
  p2: Player;
  countdown: number;
  setCountdown: (i: number | ((prev: number) => number)) => void;
  pick: (playerId: "p1" | "p2", c: Choice) => void;
}> = ({ p1, p2, pick, setCountdown, countdown }) => {
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
            </div>
          ) : (
            <div className="opponent-wait">
              {p1.choice ? (
                <div className="countdown-number" aria-live="polite">
                  {countdown ?? INIT_COUNT}
                </div>
              ) : (
                <div className="waiting-text">Pick you arm</div>
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

export default Board;
