import { useGameStore } from "../../stores/gameStore.js";

function BaseWord() {
  const { gameBaseWord } = useGameStore();

  const baseWordArray = gameBaseWord.split("");

  return (
    <div className="base-word">
      {baseWordArray.map((letter, index) => (
        <button key={index} className="letter-button">
          {letter}
        </button>
      ))}
    </div>
  );
}

export default BaseWord;
