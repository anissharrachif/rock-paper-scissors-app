import ChoiceField from "../Fields/ChoiceField";
import type { Choice } from "../../types";

type Props = {
  onPick: (c: Choice) => void;
  disabled?: boolean;
  selected?: Choice | null;
  highlightSelected?: boolean;
};

const Controls = ({ onPick, disabled, selected, highlightSelected }: Props) => {
  return (
    <div className="controls">
      <ChoiceField
        choice="scissors"
        onClick={onPick}
        disabled={disabled}
        selected={highlightSelected && selected === "scissors"}
      />
      <ChoiceField
        choice="rock"
        onClick={onPick}
        disabled={disabled}
        selected={highlightSelected && selected === "rock"}
      />
      <ChoiceField
        choice="paper"
        onClick={onPick}
        disabled={disabled}
        selected={highlightSelected && selected === "paper"}
      />
    </div>
  );
};

export default Controls;
