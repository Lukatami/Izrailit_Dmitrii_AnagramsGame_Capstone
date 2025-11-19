import { useGameStore } from "../../stores/gameStore";
import { useGlobalStore } from "../../stores/globalStore";

import { texts } from "../../data/texts.js";

function GameOver() {
  const { interfaceLanguage, setMenuStage } = useGlobalStore();
  const { currentGame, resetGameState } = useGameStore();
  const text = texts[interfaceLanguage];

  function handleReturnToMenu() {
    resetGameState();
    setMenuStage();
  }

  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>Your final score: {currentGame.totalScore}</p>
      <button onClick={handleReturnToMenu}>{text.returnToMenu}</button>
    </div>
  );
}

export default GameOver;
