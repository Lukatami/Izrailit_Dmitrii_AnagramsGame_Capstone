import { useWordsStore } from "../../stores/wordsStore.js";

function PlayerWord() {
  const { playerWord, playerWordScore, isCorrect } = useWordsStore();

  return (
    <div className="player-word">
      <h3>Current Word: {playerWord}</h3>
      {playerWord && (
        <p className={isCorrect ? "correct" : "incorrect"}>
          Score: {playerWordScore} {isCorrect ? "✓" : ""}
        </p>
      )}
    </div>
  );
}

export default PlayerWord;
