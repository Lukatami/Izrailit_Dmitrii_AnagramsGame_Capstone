import { useGlobalStore } from "../../stores/globalStore.js";
import Language from "./Language.jsx";
import ReturnToMenuButton from "./ReturnToMenuButton.jsx";

function SettingsMenu({}) {
  const { appStage } = useGlobalStore();

  return (
    <div className="settings">
      <Language />
      {appStage === "main" ? "" : <ReturnToMenuButton />}
    </div>
  );
}

export default SettingsMenu;
