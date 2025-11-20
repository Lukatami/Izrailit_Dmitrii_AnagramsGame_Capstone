import { useGlobalStore } from "../../stores/globalStore.js";
import { usePlayerStore } from "../../stores/playerStore.js";
import { texts } from "../../data/texts.js";

import SettingsButton from "./SettingsButton.jsx";
import SettingsMenu from "../settings/SettingsMenu.jsx";
import MainMenu from "../menu/MainMenu.jsx";
import GameBoard from "../game/GameBoard.jsx";
import GameOver from "../gameover/GameOver.jsx";
import LogInButton from "../user/LogInButton.jsx";

function MainBoard({}) {
  const { interfaceLanguage, settingsShow, appStage } = useGlobalStore();
  const { playerName, isGuest, logOut } = usePlayerStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="mainBoard">
      <h1>{text.title}</h1>
      {!isGuest ? (
        <>
          <p>{playerName}</p>
          <button onClick={logOut}>Log out</button>
        </>
      ) : (
        <LogInButton />
      )}
      <SettingsButton />
      {settingsShow ? <SettingsMenu /> : ""}
      {appStage === "main" ? <MainMenu /> : ""}
      {appStage === "game" ? <GameBoard /> : ""}
      {appStage === "gameOver" ? <GameOver /> : ""}
    </div>
  );
}

export default MainBoard;
