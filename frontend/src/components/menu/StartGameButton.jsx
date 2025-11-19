import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function StartGameButton() {
  const {
    guestName,
    interfaceLanguage,
    settingsShow,
    toggleSettingsShow,
    setGameStage,
  } = useGlobalStore();
  const { gameLanguage, gameDifficulty, startGame } = useGameStore();

  const text = texts[interfaceLanguage];

  async function handleStartGame() {
    // if (!player.name) {
    //   alert(text.enterName);
    //   return;
    // }
    // if (!gameDifficulty) {
    //   alert(text.chooseDifficulty);
    //   return;
    // }
    // if (!gameLanguage) {
    //   alert(text.chooseGameLanguage);
    //   return;
    // }
    console.log("Starting game with:", {
      guestName: guestName,
      difficulty: gameDifficulty,
      language: gameLanguage,
    });

    try {
      if (settingsShow) toggleSettingsShow();
      setGameStage();
      await startGame(gameLanguage, gameDifficulty);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }

  return (
    <button
      className="start-button"
      onClick={handleStartGame}
      // disabled={!player.name || !gameDifficulty || !gameLanguage}
      // title={`To start game:
      //   ${!player.name ? text.enterName : ""}
      //   ${!gameDifficulty ? text.chooseDifficulty : ""}
      //   ${!gameLanguage ? text.chooseGameLanguage : ""}`}
    >
      {text.startGame}
    </button>
  );
}

export default StartGameButton;
