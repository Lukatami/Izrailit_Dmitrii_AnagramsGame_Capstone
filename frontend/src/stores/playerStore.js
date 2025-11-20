import { create } from "zustand";

const LS_KEY = "player_store"

const initialPlayerState = {
  playerId: "",
  playerName: "",
  playerEmail: "",
  avatarUrl: "",

  authToken: "",
  isGuest: true,
  isLoggedIn: false,

  loadingPlayer: false,
  playerError: null,

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
