import { create } from "zustand";
import { nanoid } from "nanoid";

export const useGlobalStore = create((set, get) => ({
  player: {
    name: "",
    id: "",
  },
  interfaceLanguage: "en",
  gameDifficulty: "",
  gameLanguage: "",
  appStage: "main",
  settingsShow: false,

  setPlayerName: (name) => {
    const trimmedName = name.trim();

    set((state) => {
      if (!trimmedName) {
        return {
          player: { name: "", id: "" },
        };
      }

      const newId = state.player.id || nanoid(6);

      return {
        player: {
          name: trimmedName,
          id: newId,
        },
      };
    });
    const updatedPlayerName = get().player.name;
    console.log("Current player name: ", updatedPlayerName);
  },

  resetPlayer: () => {
    set({
      player: { name: "", id: "" },
    });
    const updatedPlayerName = get().player.name;
    console.log("Current player name: ", updatedPlayerName);
  },

  setInterfaceSelectedLanguage: (lang) => {
    set({ interfaceLanguage: lang });
    const updatedInterfaceLanguage = get().interfaceLanguage;
    console.log("Selected game language: ", updatedInterfaceLanguage);
  },

  setGameSelectedLanguage: (lang) => {
    set({ gameLanguage: lang });
    const updatedGameLanguage = get().gameLanguage;
    console.log("Selected game language: ", updatedGameLanguage);
  },

  setSelectedDifficulty: (diff) => {
    set({ gameDifficulty: diff });
    const updatedGameDifficulty = get().gameDifficulty;
    console.log("Selected game difficulty: ", updatedGameDifficulty);
  },

  setGameStage: () => {
    set({ appStage: "game" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  resetGame: () => {
    set({
      player: { name: "", id: "" },
      gameDifficulty: "",
      gameLanguage: "",
      appStage: "main",
    });
  },

  toggleSettingsShow: () => {
    set((state) => ({ settingsShow: !state.settingsShow }));
    const updatedSettingsShow = get().settingsShow;
    console.log("Current settingsShow toggle: ", updatedSettingsShow);
  },
}));
