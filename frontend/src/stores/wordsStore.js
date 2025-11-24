import { create } from "zustand";
import { scoreCalculator } from "../utils/scoreCalculator.js";

const initialWordsState = {
  isCheckLoading: false,
  loadingError: null,

  playerWord: "",
  isCorrect: false,
  isError: false,
  playerWordScore: 0,

  availableLetters: [],
  selectedLetters: [],
  usedLetters: new Set(),

  isBaseWordLoading: false,
};

export const useWordsStore = create((set, get) => ({
  ...initialWordsState,

  setGameBaseWord: async (lang) => {
    set({
      isBaseWordLoading: true,
      loadingError: null,
      isError: false,
      isCorrect: false,
    });

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

      const baseWord = data.baseWord.toLowerCase();
      const baseWordId = data._id;
      const availableLetters = baseWord.split("");

      set({
        availableLetters: availableLetters,
        selectedLetters: [],
        playerWord: "",
        isCorrect: false,
        isError: false,
        playerWordScore: 0,
        usedLetters: new Set(),
        isBaseWordLoading: false,
      });

      return { baseWord: baseWord, baseWordId: baseWordId };
    } catch (e) {
      console.error("Failed to fetch base word:", e);
      set({
        loadingError: e.message,
        isBaseWordLoading: false,
      });
      throw e;
    }
  },

  addLetter: (letter, index) => {
    const { selectedLetters, playerWord, usedLetters, isError } = get();

    if (isError) return;

    if (usedLetters.has(index)) {
      return;
    }

    const newSelectedLetters = [...selectedLetters, { letter, index }];
    const newPlayerWord = playerWord + letter;
    const newUsedLetters = new Set([...usedLetters, index]);

    set({
      selectedLetters: newSelectedLetters,
      playerWord: newPlayerWord,
      usedLetters: newUsedLetters,
    });
  },

  backspace: () => {
    const { selectedLetters, playerWord, usedLetters, isError } = get();

    if (isError) return;
    if (selectedLetters.length === 0) return;

    const last = selectedLetters[selectedLetters.length - 1];

    const newSelected = selectedLetters.slice(0, -1);
    const newPlayer = playerWord.slice(0, -1);
    const newUsed = new Set(usedLetters);
    newUsed.delete(last.index);

    set({
      selectedLetters: newSelected,
      playerWord: newPlayer,
      usedLetters: newUsed,
      isCorrect: false,
      isError: false,
      playerWordScore: 0,
    });
  },

  checkPlayerWord: async (playerWord, gameLanguage, gameDifficulty) => {
    set({
      isCheckLoading: true,
      isCorrect: false,
      loadingError: null,
      isError: false,
    });

    try {
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(
        `${BASE_API_URL}/api/words/check/${playerWord}?lang=${gameLanguage}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const isExists = data.exists;

      if (isExists) {
        const score = scoreCalculator(playerWord, gameDifficulty);

        set({
          isCheckLoading: false,
          isCorrect: true,
          isError: false,
          playerWordScore: score,
        });

        return { exists: true, score };
      }

      set({
        isCheckLoading: false,
        isCorrect: false,
        isError: true,
        playerWordScore: 0,
      });

      return { exists: false, score: 0 };
    } catch (e) {
      console.error("Failed to check player word:", e);
      set({
        isCheckLoading: false,
        isCorrect: false,
        isError: true,
        playerWordScore: 0,
      });

      return { exists: false, score: 0 };
    }
  },

  resetPlayerWord: () => {
    set({
      playerWord: "",
      selectedLetters: [],
      usedLetters: new Set(),
      isCorrect: false,
      isError: false,
      playerWordScore: 0,
    });
  },

  resetWordState: () => {
    set(initialWordsState);
  },
}));
