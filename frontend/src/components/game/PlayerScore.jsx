import { useGameStore } from "../../stores/gameStore.js";

function PlayerScore() {
  const { currentGame } = useGameStore();

  return (
    <div className="player-score">
      <h2>Total Score: {currentGame.totalScore}</h2>
      <p>Words Found: {currentGame.foundWords.length}</p>
    </div>
  );
}

export default PlayerScore;
