import ReactCountryFlag from "react-country-flag";

import { useGlobalStore } from "../../stores/globalStore.js";

import { languages } from "../../data/languages.js";
import { texts } from "../../data/texts.js";

function Language() {
  const { interfaceLanguage, setInterfaceSelectedLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleLanguageButtonClick(lang, e) {
    e.preventDefault();
    setInterfaceSelectedLanguage(lang);
  }

  return (
    <div className="flags">
      <p>{text.chooseInterfaceLanguage}</p>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={(e) => handleLanguageButtonClick(lang.code, e)}
          className={interfaceLanguage === lang.code ? "active" : ""}
        >
          <ReactCountryFlag countryCode={lang.flag} svg />
        </button>
      ))}
    </div>
  );
}

export default Language;
