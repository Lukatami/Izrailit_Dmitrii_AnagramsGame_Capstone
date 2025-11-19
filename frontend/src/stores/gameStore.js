import { create } from "zustand";

const initialGameState = {
  gameDifficulty: "medium",
  gameLanguage: "ru",
  isGameLoading: false,
  loadingError: null,
  isGameActive: false,
  timeLeft: 480,
  currentGame: {
    startTime: null,
    baseWord: "",
    foundWords: [],
    totalScore: 0,
    difficulty: "",
    language: "",
  },
};

function getTimeByDifficulty(diff) {
  const timeByDifficulty = {
    easy: 600,
    medium: 15,
    hard: 300,
  };
  return timeByDifficulty[diff] || 480;
}

export const useGameStore = create((set, get) => ({
  ...initialGameState,

  startGame: async (lang, diff) => {
    set({
      isGameLoading: true,
      loadingError: null,
      gameLanguage: lang,
      gameDifficulty: diff,
      timeLeft: getTimeByDifficulty(diff),
      isGameActive: true,
      currentGame: {
        startTime: new Date(),
        baseWord: "",
        foundWords: [],
        totalScore: 0,
        difficulty: diff,
        language: lang,
      },
    });

    try {
      const wordsStore = (
        await import("./wordsStore")
      ).useWordsStore.getState();
      const baseWord = await wordsStore.setGameBaseWord(lang);
      set((state) => ({
        currentGame: {
          ...state.currentGame,
          baseWord: baseWord,
        },
      }));
    } catch (error) {
      console.error("Failed to start game:", error);
      set({
        loadingError: error.message,
        isGameActive: false,
      });
      throw error;
    } finally {
      set({ isGameLoading: false });
    }
  },

  submitWord: (playerWord, score) => {
    set((state) => {
      const newFoundWords = [
        ...state.currentGame.foundWords,
        {
          word: playerWord,
          score: score,
          timestamp: new Date(),
        },
      ];

      const newTotalScore = state.currentGame.totalScore + score;

      return {
        currentGame: {
          ...state.currentGame,
          foundWords: newFoundWords,
          totalScore: newTotalScore,
        },
      };
    });
  },

  endGame: async () => {
    const { currentGame } = get();

    if (currentGame.baseWord) {
      try {
        const playerStore = (
          await import("./playerStore")
        ).usePlayerStore.getState();
        playerStore.addGameToHistory(currentGame);
      } catch (error) {
        console.error("Failed to save game history:", error);
      }
    }

    set({ isGameActive: false });
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

  resetGameState: () => {
    set(initialGameState);
    console.log("Game state reset complete");
  },
}));
