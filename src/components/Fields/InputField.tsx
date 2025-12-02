type Props = {
  id: "p1" | "p2";
  value: string;
  onInputChange: (p: string) => void;
};

const InputField = ({ id, value, onInputChange }: Props) => {
  return (
    <label className="name-input">
      <span>{id === "p1" ? "Player 1" : "Player 2"}</span>
      <input value={value} onChange={(e) => onInputChange(e.target.value)} />
    </label>
  );
};

export default InputField;
