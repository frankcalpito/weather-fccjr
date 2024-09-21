import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: "light" | "dark";
  menuState: "open" | "closed";
}

const initialState: SettingsState = {
  theme: "light",
  menuState: "closed",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleMenu: (state) => {
      state.menuState = state.menuState === "open" ? "closed" : "open";
    },
    setMenuState: (state, action: PayloadAction<"open" | "closed">) => {
      state.menuState = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, toggleMenu, setMenuState } =
  settingsSlice.actions;
export default settingsSlice.reducer;
