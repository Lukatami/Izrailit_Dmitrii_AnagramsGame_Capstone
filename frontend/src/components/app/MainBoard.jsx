import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import SettingsMenu from "../settings/SettingsMenu.jsx";
import MainMenu from "../menu/MainMenu.jsx";
import SettingsButton from "./SettingsButton.jsx";

function MainBoard({}) {
  const { interfaceLanguage = "en", settingsShow } = useGlobalStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="mainBoard">
      <h1>{text.title}</h1>
      <SettingsButton />
      {settingsShow ? <SettingsMenu /> : ""}
      <MainMenu />
    </div>
  );
}

export default MainBoard;
