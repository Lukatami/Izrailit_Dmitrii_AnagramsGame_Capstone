import { create } from "zustand";
import { nanoid } from "nanoid";
import { languages } from "../data/languages";

export const useGlobalStore = create((set) => ({
  player: {
    name: "",
    id: "",
  },
  language: "en",
  difficulty: "medium",
  appStage: "main",

  setInitialStates: () => {
    set({
        selectedLanguage: "en",
    })
  },

  setPlayerName: (name) => {
    set({
      player: { name: name, id: nanoid(6) },
    });
  },

  setSelectedLanguage: (lang) => {
    set({
      language: lang,
    });
  },
  setSelectedDifficulty: (diff) => {
    set({
      difficulty: diff,
    });
  },

  setGameStage: () => {
    set({
      appStage: "game",
    });
  },
}));
