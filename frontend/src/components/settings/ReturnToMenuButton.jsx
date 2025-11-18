import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function ReturnToMenuButton() {
  const { interfaceLanguage, returnToMenu, toggleSettingsShow } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleReturnToMenuClick() {
    returnToMenu();
    toggleSettingsShow();
  }

  return (
    <button className="reset-button" onClick={handleReturnToMenuClick}>
      {text.returnToMenu}
    </button>
  );
}

export default ReturnToMenuButton;
