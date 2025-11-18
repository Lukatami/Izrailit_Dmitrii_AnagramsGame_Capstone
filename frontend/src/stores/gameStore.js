import { create } from "zustand";

const initialGameState = {
  gameDifficulty: "medium",
  gameLanguage: "ru",
  isGameLoading: false,
  loadingError: null,
  isGameActive: false,
  gameBaseWord: "",
  gameScore: 0,
  wordScore: 0,
  timeLeft: 120,
};

export const useGameStore = create((set, get) => ({
  ...initialGameState,

  startGame: async (lang, diff) => {
    set({
      isGameLoading: true,
      loadingError: null,
      gameLanguage: lang,
      gameDifficulty: diff,
      gameScore: 0,
      timeLeft: 5,
      isGameActive: true,
    });

    try {
      await get().setGameBaseWord(lang);
      // get().setGameTimeLeft(diff);
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

  setGameTimeLeft: (diff) => {
    const timeByDifficulty = {
      easy: 600,
      medium: 480,
      hard: 300,
    };
    const time = timeByDifficulty[diff] || 480;
    set({ timeLeft: time });
  },

  decrementTime: () => {
    set((state) => {
      const newTimeLeft = state.timeLeft - 1;

      if (newTimeLeft <= 0) {
        return {
          timeLeft: 0,
          isGameActive: false,
        };
      }
      return { timeLeft: newTimeLeft };
    });
  },

  setPlayerWord: (word) => {
    set({ playerWord: word });
  },

  setWordScore: (score) => {
    set({ wordScore: score });
  },

  setGameScore: (wordScore) => {
    const { gameScore } = get();
    set({ gameScore: gameScore + wordScore });
  },

  resetGameState: () => {
    set(initialGameState);
    console.log("Game state reset complete");
  },
}));
