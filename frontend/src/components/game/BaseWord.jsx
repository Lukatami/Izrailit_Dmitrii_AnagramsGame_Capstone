import { useGameStore } from "../../stores/gameStore.js";

function BaseWord() {
  const { gameBaseWord } = useGameStore();

  return <div className="base-word">{gameBaseWord}</div>;
}

export default BaseWord;
