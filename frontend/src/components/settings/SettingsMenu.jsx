import { useGlobalStore } from "../../stores/globalStore.js";
import Language from "./Language.jsx";
import UserName from "./UserName.jsx";

function SettingsMenu({}) {
  const { interfaceLanguage } = useGlobalStore();

  return (
    <div className="settings">
      <Language />
      <UserName />
    </div>
  );
}

export default SettingsMenu;
