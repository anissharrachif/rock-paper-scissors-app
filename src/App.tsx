import Board from "./components/Board/Board";
import "./styles/main.scss";
import { useGame } from "./hooks/useGame";

function App() {
  const game = useGame();
  return <Board {...game} />;
}

export default App;
