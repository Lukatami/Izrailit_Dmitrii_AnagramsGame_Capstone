import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import { languages } from "../../data/languages.js";
import { difficulties } from "../../data/difficulties.js";
import { useEffect } from "react";

function MainMenu({}) {
  const {
    player,
    stage,
    language,
    difficulty,
    setInitialStates,
    setPlayerName,
    setSelectedLanguage,
    setSelectedDifficulty,
    setGameStage,
  } = useGlobalStore();

  if (!language) {
      setInitialStates()
    }

  const text = texts[language];


  function handleLanguageButtonClick(lang, e) {
    e.preventDefault()
    setSelectedLanguage(lang);
  }

  function handlePlayerNameInput(name) {
    setPlayerName(name.trim());
    console.log(player)
  }

  function handleDifficultyButtonClick(diff, e) {
    e.preventDefault()
    setSelectedDifficulty(diff);
    console.log(difficulty)
  }

  function handleStartGame() {
    if (!player.name) {
      alert(text.enterName);
      return;
    }
    if (!difficulty) {
      alert(text.chooseDifficulty);
      return;
    }
    setGameStage();
    console.log(stage)
  }

  return (
    <div className="mainMenu">
      <h1>{text.title}</h1>

      <div className="flags">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={(e) => handleLanguageButtonClick(lang.code, e)}
            className={language === lang.code ? "active" : ""}
          >
            {lang.flag}
            {lang.label}
          </button>
        ))}
      </div>

      <div className="name-input">
        <p>{text.enterName}</p>
        <input
          type="text"
          value={player.name}
          placeholder={text.enterName}
          onChange={(e) => handlePlayerNameInput(e.target.value)}
        />
      </div>

      <div className="difficulty-selection">
        <p>{text.chooseDifficulty}</p>
        <div className="difficulty-buttons">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={(e) => handleDifficultyButtonClick(diff, e)}
              className={difficulty === diff ? "active" : ""}
            >
              {text.difficulties?.[diff] || diff}
            </button>
          ))}
        </div>
      </div>

      <div className="start-button">
        <button
          onClick={handleStartGame}
          disabled={!player.name || !difficulty}
        >
          {text.startGame}
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
