import { useGameStore } from "../../stores/gameStore";
import { useGlobalStore } from "../../stores/globalStore";

import { texts } from "../../data/texts.js";

function GameOver() {
  const { interfaceLanguage, returnToMenu } = useGlobalStore();
  const { gameScore, resetGameState } = useGameStore();
  const text = texts[interfaceLanguage];

  const handleReturnToMenu = () => {
    resetGameState();
    returnToMenu();
  };

  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>Your final score: {gameScore}</p>
      <button onClick={handleReturnToMenu}>{text.returnToMenu}</button>
    </div>
  );
}

export default GameOver;
