import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import { difficulties } from "../../data/difficulties.js";

function Difficulty() {
  const { language, difficulty, setSelectedDifficulty } = useGlobalStore();

  const text = texts[language];

  function handleDifficultyButtonClick(diff, e) {
    e.preventDefault();
    setSelectedDifficulty(diff);
  }

  return (
    <div className="difficulty-selection">
      <p>{text.chooseDifficulty}</p>
      <div className="difficulty-buttons">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={(e) => handleDifficultyButtonClick(diff, e)}
            className={difficulty === diff ? "active" : ""}
          >
            {text.difficulties[diff]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Difficulty;
