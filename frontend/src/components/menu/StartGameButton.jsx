import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function StartGameButton() {
  const navigate = useNavigate();
  const { interfaceLanguage } = useGlobalStore();
  const { gameLanguage, gameDifficulty, startGame } = useGameStore();

  const text = texts[interfaceLanguage];

  async function handleStartGame() {
    try {
      await startGame(gameLanguage, gameDifficulty);
      navigate("/game");
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }

  return (
    <button
      className="w-full py-4 mt-4 text-xl font-bold text-white bg-red-500 rounded-2xl shadow-lg hover:bg-red-600 active:scale-95 transition-transform duration-150"
      onClick={handleStartGame}
    >
      {text.startGame}
    </button>
  );
}

export default StartGameButton;
