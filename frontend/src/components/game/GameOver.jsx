import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function GameOver() {
  const navigate = useNavigate();
  const { currentGame, resetGameState, gameOver } = useGameStore();
  const { resetWordState } = useWordsStore();
  const { interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleClose() {
    resetGameState();
    resetWordState();
    navigate("/");
  }

  if (!gameOver) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-red-500 drop-shadow-lg">
          {text.gameOver}
        </h2>
        <p className="text-white text-lg">
          {text.finalScore}:{" "}
          <span className="text-emerald-300 font-semibold">
            {currentGame.totalScore}
          </span>
        </p>
        <button
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg transition active:scale-95"
          onClick={handleClose}
        >
          {text.returnToMenu}
        </button>
      </div>
    </div>
  );
}

export default GameOver;
