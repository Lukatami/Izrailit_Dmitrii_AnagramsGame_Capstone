import { create } from "zustand";
import { nanoid } from "nanoid";

export const useGlobalStore = create((set, get) => ({
  player: {
    name: "",
    id: "",
  },
  interfaceLanguage: "en",
  difficulty: "medium",
  gameLanguage: "en",
  appStage: "main",

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
    set({ difficulty: diff });
    const updatedGameDifficulty = get().difficulty;
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
      difficulty: "medium",
      appStage: "main",
    });
  },
}));
