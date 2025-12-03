import Board from "./components/Game/Board";
import "./styles/main.scss";
import "./styles/buttons.scss";
import { useGame } from "./hooks/useGame";

function App() {
  const game = useGame();
  return <Board {...game} />;
}

export default App;
