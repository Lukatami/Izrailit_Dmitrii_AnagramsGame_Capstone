import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import { useState } from "react";

function Controls() {
  const { interfaceLanguage } = useGlobalStore();
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

  const text = texts[interfaceLanguage];
  const [message, setMessage] = useState(null);

  const alreadyFound = text.message.alreadyFound;
  const notInDictionary = text.message.notInDictionary;
  const checkFailed = text.message.checkFailed;

  async function handleConfirm() {
    if (!isGameActive || !playerWord.trim() || isCheckLoading) return;

    const isDuplicate = currentGame.foundWords.some(
      (w) => w.word.toLowerCase() === playerWord.toLowerCase()
    );
    if (isDuplicate) {
      setMessage(alreadyFound);
      setTimeout(() => {
        setMessage(null), resetPlayerWord();
      }, 1000);
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
        setMessage(notInDictionary);
        setTimeout(() => {
          setMessage(null), resetPlayerWord();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage(checkFailed);
      setTimeout(() => {
        setMessage(null), resetPlayerWord();
      }, 1000);
    }
  }

  function handleBackspace() {
    backspace();
  }

  function handleClear() {
    resetPlayerWord();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          disabled={!playerWord.trim() || isCheckLoading}
          className={`w-12 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim() && !isCheckLoading
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Confirm"
        >
          {isCheckLoading ? "⏳" : "✅"}
        </button>

        <button
          onClick={handleBackspace}
          disabled={!playerWord.trim()}
          className={`w-12 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim()
                ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Backspace"
        >
          ⬅️
        </button>

        <button
          onClick={handleClear}
          disabled={!playerWord.trim()}
          className={`w-12 h-12 rounded-lg font-bold text-lg transition flex items-center justify-center
            ${
              playerWord.trim()
                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          title="Clear"
        >
          ❌
        </button>
      </div>

      {message && <div className="text-sm text-white/90 mt-1">{message}</div>}
    </div>
  );
}

export default Controls;
