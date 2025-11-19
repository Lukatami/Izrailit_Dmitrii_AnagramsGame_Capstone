import BaseWord from "./BaseWord";
import PlayerWord from "./PlayerWord";
import Timer from "./Timer";
import Controls from "./Controls";
import FoundWords from "./FoundWords";
import PlayerScore from "./PlayerScore";

function GameBoard() {

  return (
    <div className="game-board">
      <Timer />
      <BaseWord />
      <PlayerWord />
      <Controls />
      <FoundWords />
      <PlayerScore />
    </div>
  );
}

export default GameBoard;
