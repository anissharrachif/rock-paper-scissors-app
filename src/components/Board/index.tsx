import React from "react";
import type { Player } from "../../types";
const Board: React.FC<{ p1: Player; p2: Player }> = ({ p1, p2 }) => {
  return (
    <div className="scoreboard">
      <div className="player">
        <div className="name">{p1.name}</div>
        <div className="score">{p1.score}</div>
      </div>
      <div>vs</div>
      <div className="player">
        <div className="name">{p2.name}</div>
        <div className="score">{p2.score}</div>
      </div>
    </div>
  );
};

export default Board;
