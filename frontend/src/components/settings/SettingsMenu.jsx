import Language from "./Language.jsx";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function SettingsMenu() {
  const { interfaceLanguage } = useGlobalStore();
  const text = texts[interfaceLanguage];
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-red-500 drop-shadow mb-2">
        {text.settings}
      </h2>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
        <Language />
      </div>
    </div>
  );
}

export default SettingsMenu;
