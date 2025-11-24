import { useWordsStore } from "../../stores/wordsStore.js";

function BaseWord() {
  const { availableLetters, addLetter, usedLetters, isBaseWordLoading } =
    useWordsStore();

  return (
    <div className="w-full bg-white/8 backdrop-blur-xl rounded-3xl shadow-lg p-4">
      <div
        className="grid gap-3 py-3 px-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(56px, 1fr))",
          justifyItems: "center",
        }}
      >
        {isBaseWordLoading ? (
          <div className="col-span-full w-full flex justify-center items-center py-8">
            <div className="animate-pulse text-white/70">Loading letters…</div>
          </div>
        ) : (
          availableLetters.map((letter, index) => {
            const isUsed = usedLetters.has(index);
            return (
              <button
                key={`${letter}-${index}`}
                onClick={() => !isUsed && addLetter(letter, index)}
                disabled={isUsed}
                className={`
                  w-full max-w-[64px] aspect-square rounded-xl flex items-center justify-center font-bold text-lg transition
                  ${
                    isUsed
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
                  }
                `}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-2 text-center text-xs text-white/60">
        Tap tiles to build a word.
      </div>
    </div>
  );
}

export default BaseWord;
