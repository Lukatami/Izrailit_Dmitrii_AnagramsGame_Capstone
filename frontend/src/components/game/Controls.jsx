import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";
import { useState } from "react";

function Controls() {
  const {
    currentGame,
    gameLanguage,
    gameDifficulty,
    submitWord,
    isGameActive,
  } = useGameStore();
  const {
    playerWord,
    checkPlayerWord,
    resetPlayerWord,
    isCheckLoading,
    backspace,
  } = useWordsStore();

  const [message, setMessage] = useState(null);

  async function handleConfirm() {
    if (!isGameActive || !playerWord.trim() || isCheckLoading) return;

    const isDuplicate = currentGame.foundWords.some(
      (w) => w.word.toLowerCase() === playerWord.toLowerCase()
    );
    if (isDuplicate) {
      setMessage("Already found");
      setTimeout(() => setMessage(null), 1000);
      resetPlayerWord();
      return;
    }

    try {
      const result = await checkPlayerWord(
        playerWord,
        gameLanguage,
        gameDifficulty
      );

      if (result.exists) {
        if (typeof submitWord === "function") {
          submitWord(playerWord, result.score);
          setTimeout(() => resetPlayerWord(), 1000);
        }
      } else {
        setMessage("Not in dictionary");
        setTimeout(() => setMessage(null), 900);
      }
    } catch (err) {
      console.error(err);
      setMessage("Check failed");
      setTimeout(() => setMessage(null), 900);
      resetPlayerWord();
    }
  }

  function handleBackspace() {
    backspace();
  }

  function handleClear() {
    resetPlayerWord();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-3">
        <button
          onClick={handleConfirm}
          disabled={!playerWord.trim() || isCheckLoading}
          className={`w-16 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim() && !isCheckLoading
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Confirm"
        >
          {isCheckLoading ? "⏳" : "OK"}
        </button>

        <button
          onClick={handleBackspace}
          disabled={!playerWord.trim()}
          className={`w-16 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim()
                ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Backspace"
        >
          ⌫
        </button>

        <button
          onClick={handleClear}
          disabled={!playerWord.trim()}
          className={`w-16 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim()
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Clear"
        >
          Clear
        </button>
      </div>

      {message && <div className="text-sm text-white/90 mt-1">{message}</div>}
    </div>
  );
}

export default Controls;
