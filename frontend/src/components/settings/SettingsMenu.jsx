import { useGlobalStore } from "../../stores/globalStore.js";
import Language from "./Language.jsx";
import ReturnToMenuButton from "./ReturnToMenuButton.jsx";
import UserName from "./UserName.jsx";

function SettingsMenu({}) {
  const { appStage } = useGlobalStore();

  return (
    <div className="settings">
      <Language />
      <UserName />
      {appStage === "main" ? "" : <ReturnToMenuButton />}
    </div>
  );
}

export default SettingsMenu;
