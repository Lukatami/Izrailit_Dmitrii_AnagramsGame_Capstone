import { useWordsStore } from "../../stores/wordsStore.js";

function PlayerWord() {
  const { playerWord, isCorrect, isError } = useWordsStore();

  const wordStyle = isError
    ? "text-red-400 animate-shake"
    : isCorrect
    ? "text-emerald-300"
    : "text-amber-400";

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`text-4xl font-mono tracking-widest min-h-[56px] flex items-center justify-center w-full text-center ${wordStyle}`}
      >
        {playerWord ? playerWord.toUpperCase() : "..."}
      </div>

      {playerWord && (
        <div
          className={` font-semibold ${
            isCorrect
              ? "text-emerald-300"
              : isError
              ? "text-red-400"
              : "text-white/80"
          }`}
        ></div>
      )}
    </div>
  );
}

export default PlayerWord;
