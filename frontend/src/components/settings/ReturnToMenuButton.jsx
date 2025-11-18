import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function ReturnToMenuButton() {
  const { interfaceLanguage, setMenuStage, toggleSettingsShow, settingsShow } =
    useGlobalStore();
  const { resetGameState } = useGameStore();

  const text = texts[interfaceLanguage];

  function handleReturnToMenuClick() {
    if (settingsShow) toggleSettingsShow();
    resetGameState();
    setMenuStage();
  }

  return (
    <button className="reset-button" onClick={handleReturnToMenuClick}>
      {text.returnToMenu}
    </button>
  );
}

export default ReturnToMenuButton;
