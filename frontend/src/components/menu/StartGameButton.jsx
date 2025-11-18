import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../../../backend/src/data/texts.js";

function StartGameButton() {
  const { player, gameLanguage, interfaceLanguage, difficulty, setGameStage } =
    useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleStartGame() {
    if (!player.name) {
      alert(text.enterName);
      return;
    }
    if (!difficulty) {
      alert(text.chooseDifficulty);
      return;
    }
    console.log("Player name: ", player.name);
    console.log("Game difficulty selected: ", difficulty);
    console.log("Game language selected: ", gameLanguage);
    setGameStage();
  }

  return (
    <div className="start-button">
      <button onClick={handleStartGame} disabled={!player.name || !difficulty}>
        {text.startGame}
      </button>
    </div>
  );
}

export default StartGameButton;
