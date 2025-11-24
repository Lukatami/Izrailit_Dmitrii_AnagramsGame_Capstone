import GameDifficulty from "./GameDifficulty.jsx";
import StartGameButton from "./StartGameButton.jsx";
import GameLanguage from "./GameLanguage.jsx";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function MainMenu() {
  const { interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold text-red-500 text-center drop-shadow-lg">
        {text.setUpGame}
      </h2>
      <div className="w-full">
        <GameDifficulty />
      </div>
      <div className="w-full">
        <GameLanguage />
      </div>
      <div className="w-full">
        <StartGameButton />
      </div>
    </div>
  );
}

export default MainMenu;
