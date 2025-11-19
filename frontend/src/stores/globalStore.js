import { create } from "zustand";
import { nanoid } from "nanoid";

const initialGlobalState = {
  isLoggedIn: false,
  guestName: "",
  interfaceLanguage: "en",
  appStage: "main",
  settingsShow: false,
};

export const useGlobalStore = create((set, get) => ({
  ...initialGlobalState,

  setGuestName: (guestName) => {
    const trimmedguestName = guestName.trim();
    set({ guestName: trimmedguestName });
  },

  resetGuestName: () => {
    set({ guestName: "" });
  },

  // Interface language settings
  setInterfaceSelectedLanguage: (lang) => {
    set({ interfaceLanguage: lang });
    const updatedInterfaceLanguage = get().interfaceLanguage;
    console.log("Selected game language: ", updatedInterfaceLanguage);
  },

  // Stage controllers

  // Game stage
  setGameStage: () => {
    set({ appStage: "game" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // GameOver stage
  setGameOverStage: () => {
    set({ appStage: "gameOver" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // Menu stage
  setMenuStage: () => {
    set({ appStage: "main" });
    const updatedAppStage = get().appStage;
    console.log("Current app stage: ", updatedAppStage);
  },

  // Settings pop-up toggle
  toggleSettingsShow: () => {
    set((state) => ({ settingsShow: !state.settingsShow }));
    const updatedSettingsShow = get().settingsShow;
    console.log("Current settingsShow toggle: ", updatedSettingsShow);
  },
}));
