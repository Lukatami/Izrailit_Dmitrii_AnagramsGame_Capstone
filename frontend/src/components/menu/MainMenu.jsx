import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../../../backend/src/data/texts.js";
import GameDifficulty from "./GameDifficulty.jsx";
import StartGameButton from "./StartGameButton.jsx";
import SettingsMenu from "../settings/SettingsMenu.jsx";
import GameLanguage from "./GameLanguage.jsx";

function MainMenu({}) {
  const { interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="mainMenu">
      <h1>{text.title}</h1>
      <SettingsMenu />
      <GameDifficulty />
      <GameLanguage />
      <StartGameButton />
    </div>
  );
}

export default MainMenu;
