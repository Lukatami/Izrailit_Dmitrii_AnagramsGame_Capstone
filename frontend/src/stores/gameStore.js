import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  player: {
    name: "",
    id: "",
  },
  gameDifficulty: "",
  gameLanguage: "",

  setGameSelectedLanguage: (lang) => {
    set({ gameLanguage: lang });
    const updatedGameLanguage = get().gameLanguage;
    console.log("Selected game language: ", updatedGameLanguage);
  },

  setGameSelectedDifficulty: (diff) => {
    set({ gameDifficulty: diff });
    const updatedGameDifficulty = get().gameDifficulty;
    console.log("Selected game difficulty: ", updatedGameDifficulty);
  },

  resetGameState: () => {
    set({
      gameDifficulty: "",
      gameLanguage: "",
    });
    const updatedGameDifficulty = get().gameDifficulty;
    const updatedGameLanguage = get().gameLanguage;
    console.log(
      `Resetted game difficulty: ${updatedGameDifficulty} and language: ${updatedGameLanguage}`
    );
  },
}));
