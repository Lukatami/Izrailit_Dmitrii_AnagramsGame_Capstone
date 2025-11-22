import { create } from "zustand";
import { usePlayerStore } from "./playerStore";

export const useLeaderBoardStore = create((set) => ({
  topList: [],
  myRank: null,
  isLoading: false,

  fetchLeaderBoards: async () => {
    set({ isLoading: true });

    try {
      const { authToken } = usePlayerStore.getState();
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const topResponse = await fetch(
        `${BASE_API_URL}/api/gamesessions/leaderboard/top`
      );
      const topData = await topResponse.json();

      set({ topList: topData.leaderboard || [] });

      if (authToken) {
        const myResponse = await fetch(
          `${BASE_API_URL}/api/gamesessions/leaderboard/my-rank`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const myData = await myResponse.json();

        set({
          myRank: {
            rank: myData.rank,
            player: myData.player,
          },
        });
      }
    } catch (error) {
      console.error("Leaderboard error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
