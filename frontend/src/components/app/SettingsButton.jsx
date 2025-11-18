import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function SettingsButton() {
  const { toggleSettingsShow, interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleShowSetting() {
    toggleSettingsShow();
  }

  return (
    <div className="settings-button">
      <button onClick={handleShowSetting}>{text.settings}</button>
    </div>
  );
}

export default SettingsButton;
