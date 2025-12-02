import type { Choice } from "../../types";
import rock from "../../assets/rock.png";
import paper from "../../assets/paper.png";
import scissors from "../../assets/ciss.png";
const ChoiceField: React.FC<{
  choice: Choice;
  onClick: (c: Choice) => void;
  disabled?: boolean;
  selected?: boolean;
}> = ({ choice, onClick, disabled, selected }) => {
  if (!choice) return null;
  const icon = {
    rock: rock,
    paper: paper,
    scissors: scissors,
  }[choice];
  return (
    <button
      className={"choice-btn" + (selected ? " is-selected" : "")}
      onClick={() => onClick(choice)}
      disabled={disabled}
      aria-label={choice}
    >
      <img src={icon} alt={choice} />
    </button>
  );
};

export default ChoiceField;
