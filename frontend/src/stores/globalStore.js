import { create } from "zustand";
import { nanoid } from "nanoid";

import { useGameStore } from "./gameStore";

export const useGlobalStore = create((set, get) => ({
  player: {
    name: "",
    id: "",
  },
  interfaceLanguage: "en",
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

  setGameStage: () => {
    set({ appStage: "game" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  returnToMenu: () => {
    set({
      appStage: "main",
    });
    useGameStore.getState().resetGameState();
  },

  toggleSettingsShow: () => {
    set((state) => ({ settingsShow: !state.settingsShow }));
    const updatedSettingsShow = get().settingsShow;
    console.log("Current settingsShow toggle: ", updatedSettingsShow);
  },
}));
