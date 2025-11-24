import { useGameStore } from "../../stores/gameStore";
import TimerScoreCard from "./TimerScoreCard";
import BaseWord from "./BaseWord";
import PlayerWord from "./PlayerWord";
import Controls from "./Controls";
import FoundWords from "./FoundWords";

import GameOver from "./GameOver";

function GameBoard() {
  const { gameOver, isGameActive} = useGameStore();

  if (!isGameActive && !gameOver) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 py-6 gap-6">
      {!gameOver && (
        <>
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <TimerScoreCard />
            </div>
          </div>
          <div className="w-full max-w-4xl">
            <BaseWord />
          </div>
          <div className="w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg p-4 flex flex-col md:flex-row items-stretch gap-4">
              <div className="flex-1 flex">
                <PlayerWord />
                <Controls />
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl">
            <FoundWords />
          </div>
        </>
      )}
      {gameOver && <GameOver />}
    </div>
  );
}

export default GameBoard;
