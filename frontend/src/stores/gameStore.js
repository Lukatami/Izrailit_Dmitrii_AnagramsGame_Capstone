import { create } from "zustand";

import { useGlobalStore } from "./globalStore";

export const useGameStore = create((set, get) => ({
  player: {
    name: "",
    id: "",
  },
  gameDifficulty: "",
  gameLanguage: "",
  isGameLoading: false,
  loadingError: null,
  isGameActive: false,
  gameBaseWord: "",
  gameScore: 0,
  wordScore: 0,
  timeLeft: 120,

  startGame: async (lang, diff) => {
    set({
      isGameLoading: true,
      loadingError: null,
      gameLanguage: lang,
      gameDifficulty: diff,
      gameScore: 0,
      timeLeft: 120,
      isGameActive: true,
    });

    useGlobalStore.getState().setGameStage();

    try {
      await get().setGameBaseWord(lang);
      get().setGameTimeLeft(diff);
    } catch (error) {
      console.error("Failed to start game:", error);
    } finally {
      set({ isGameLoading: false });
    }
  },

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

  setGameBaseWord: async (lang) => {
    const { isGameActive } = get();

    if (!isGameActive) {
      console.error("Game is not Active");
      return;
    }

    set({ isGameLoading: true, loadingError: null });

    try {
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(
        `${BASE_API_URL}/api/basewords/random/${lang}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data?.baseWord || typeof data.baseWord !== "string") {
        throw new Error("Invalid word data received from server");
      }

      const baseWord = data.baseWord;

      set({ gameBaseWord: baseWord, isGameLoading: false, loadingError: null });

      return baseWord;
    } catch (e) {
      console.error("Failed to fetch base word:", e);
      set({
        loadingError: e.message,
        isGameLoading: false,
        gameBaseWord: null,
      });
    }
  },

  setGameTimeLeft: (diff) => {},

  setPlayerWord: () => {},

  setWordScore: () => {},

  setGameScore: (wordScore) => {
    set({});
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
