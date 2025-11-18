import { useGlobalStore } from "../../stores/globalStore.js";

function SettingsButton() {
  const { toggleSettingsShow } = useGlobalStore();

  function handleShowSetting() {
    toggleSettingsShow();
  }

  return (
    <div className="settings-button">
      <button onClick={handleShowSetting}>Settings</button>
    </div>
  );
}

export default SettingsButton;
