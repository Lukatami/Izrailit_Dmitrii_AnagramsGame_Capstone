import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function ReturnToMenuButton() {
  const { interfaceLanguage, resetGame, toggleSettingsShow } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleReturnToMenuClick() {
    resetGame();
    toggleSettingsShow();
  }

  return (
    <button className="reset-button" onClick={handleReturnToMenuClick}>
      Main Menu
    </button>
  );
}

export default ReturnToMenuButton;
