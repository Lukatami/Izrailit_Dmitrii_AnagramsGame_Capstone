import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import SettingsMenu from "../settings/SettingsMenu.jsx";
import MainMenu from "../menu/MainMenu.jsx";
import SettingsButton from "./SettingsButton.jsx";
import GameBoard from "../game/GameBoard.jsx";

function MainBoard({}) {
  const { interfaceLanguage, settingsShow, appStage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="mainBoard">
      <h1>{text.title}</h1>
      <SettingsButton />
      {settingsShow ? <SettingsMenu /> : ""}
      {appStage === "main" ? <MainMenu /> : ""}
      {appStage === "game" ? <GameBoard /> : ""}
    </div>
  );
}

export default MainBoard;
