import { create } from "zustand";

const initialLeaderBoardState = {
  top: [],
  myRank: null,
  loading: false,
  error: null,
};

export const useLeaderBoardStore = create((set, get) => ({
  ...initialLeaderBoardState,
}));
