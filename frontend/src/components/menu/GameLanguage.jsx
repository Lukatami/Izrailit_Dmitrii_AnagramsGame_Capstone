import { languages } from "../../../../backend/src/data/languages.js";
import { useGlobalStore } from "../../stores/globalStore.js";
import ReactCountryFlag from "react-country-flag";

function GameLanguage() {
  const { gameLanguage, setGameSelectedLanguage } = useGlobalStore();

  function handleLanguageButtonClick(lang, e) {
    e.preventDefault();
    setGameSelectedLanguage(lang);
  }

  return (
    <div className="flags">
      <p>Choose game language</p>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={(e) => handleLanguageButtonClick(lang.code, e)}
          className={gameLanguage === lang.code ? "active" : ""}
        >
          <ReactCountryFlag countryCode={lang.flag} svg />
        </button>
      ))}
    </div>
  );
}

export default GameLanguage;
