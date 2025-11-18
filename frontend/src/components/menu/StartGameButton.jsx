import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function StartGameButton() {
  const { player, interfaceLanguage, setGameStage, toggleSettingsShow } =
    useGlobalStore();
  const { gameLanguage, gameDifficulty } = useGameStore();

  const text = texts[interfaceLanguage];

  function handleStartGame() {
    if (!player.name) {
      alert(text.enterName);
      return;
    }
    if (!gameDifficulty) {
      alert(text.chooseDifficulty);
      return;
    }
    console.log("Player name: ", player.name);
    console.log("Game difficulty selected: ", gameDifficulty);
    console.log("Game language selected: ", gameLanguage);
    setGameStage();
    toggleSettingsShow();
  }

  return (
    <button
      className="start-button"
      onClick={handleStartGame}
      disabled={!player.name || !gameDifficulty || !gameLanguage}
      title={`To start game:
        ${!player.name ? text.enterName : ""}
        ${!gameDifficulty ? text.chooseDifficulty : ""}
        ${!gameLanguage ? text.chooseGameLanguage : ""}`}
    >
      {text.startGame}
    </button>
  );
}

export default StartGameButton;
