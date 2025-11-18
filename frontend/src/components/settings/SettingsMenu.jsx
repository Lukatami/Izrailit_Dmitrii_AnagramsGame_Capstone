import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../../../backend/src/data/texts.js";
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
