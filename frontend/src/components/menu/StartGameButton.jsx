import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function StartGameButton() {
  const { interfaceLanguage, settingsShow, toggleSettingsShow, setGameStage } =
    useGlobalStore();
  const { gameLanguage, gameDifficulty, startGame } = useGameStore();

  const text = texts[interfaceLanguage];

  async function handleStartGame() {
    try {
      if (settingsShow) toggleSettingsShow();
      setGameStage();
      await startGame(gameLanguage, gameDifficulty);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }

  return (
    <button className="start-button" onClick={handleStartGame}>
      {text.startGame}
    </button>
  );
}

export default StartGameButton;
