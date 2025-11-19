import { useGameStore } from "../../stores/gameStore.js";

function FoundWords() {
  const { currentGame } = useGameStore();

  return (
    <div className="found-words">
      <h3>Found Words ({currentGame.foundWords.length})</h3>
      <div className="words-list">
        {currentGame.foundWords.map((wordObj, index) => (
          <div key={index} className="found-word">
            {wordObj.word} (+{wordObj.score})
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoundWords;
