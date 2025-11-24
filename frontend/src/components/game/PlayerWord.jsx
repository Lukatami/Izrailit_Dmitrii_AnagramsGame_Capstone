import { useWordsStore } from "../../stores/wordsStore.js";

function PlayerWord() {
  const { playerWord, playerWordScore, isCorrect, isError } = useWordsStore();

  const wordStyle = isError
    ? "text-red-400 animate-shake"
    : isCorrect
    ? "text-emerald-300"
    : "text-amber-400";

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className={`text-4xl font-mono tracking-widest min-h-[56px] ${wordStyle}`}
      >
        {playerWord ? playerWord.toUpperCase() : "..."}
      </div>

      {playerWord && (
        <div
          className={`mt-2 text-lg font-semibold ${
            isCorrect
              ? "text-emerald-300"
              : isError
              ? "text-red-400"
              : "text-white/80"
          }`}
        >
          Score: {playerWordScore} {isCorrect ? "✓" : ""}
        </div>
      )}
    </div>
  );
}

export default PlayerWord;
