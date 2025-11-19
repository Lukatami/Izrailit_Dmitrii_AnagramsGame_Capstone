import { create } from "zustand";

const initialPlayerState = {
  playerId: "",
  playerName: "",
  totalGames: 0,
  totalScore: 0,
  gameHistory: [],
};

export const usePlayerStore = create((set, get) => ({
  ...initialPlayerState,

  addGameToHistory: (gameData) => {
    set((state) => ({
      totalGames: state.totalGames + 1,
      totalScore: state.totalScore + gameData.totalScore,
      gameHistory: [
        ...state.gameHistory,
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...gameData,
        },
      ],
    }));
  },

  resetPlayerStats: () => {
    set(initialPlayerState);
  },
}));
