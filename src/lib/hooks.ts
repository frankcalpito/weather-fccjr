import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch`, `useSelector`, and `useStore`
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Correctly typed dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Correctly typed selector
export const useAppStore = () => useStore<AppStore>(); // Correctly typed store
