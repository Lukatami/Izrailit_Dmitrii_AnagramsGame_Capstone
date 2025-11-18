import { create } from "zustand";
import { nanoid } from "nanoid";

const initialGlobalState = {
  player: {
    name: "",
    id: "",
  },
  interfaceLanguage: "en",
  appStage: "main",
  settingsShow: false,
};

export const useGlobalStore = create((set, get) => ({
  ...initialGlobalState,

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

  // Interface language settings
  setInterfaceSelectedLanguage: (lang) => {
    set({ interfaceLanguage: lang });
    const updatedInterfaceLanguage = get().interfaceLanguage;
    console.log("Selected game language: ", updatedInterfaceLanguage);
  },

  // Stage controllers

  // Game stage
  setGameStage: () => {
    set({ appStage: "game" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // GameOver stage
  setGameOverStage: () => {
    set({ appStage: "gameOver" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // Menu stage
  setMenuStage: () => {
    set({ appStage: "main" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // Settings pop-up toggle
  toggleSettingsShow: () => {
    set((state) => ({ settingsShow: !state.settingsShow }));
    const updatedSettingsShow = get().settingsShow;
    console.log("Current settingsShow toggle: ", updatedSettingsShow);
  },
}));
