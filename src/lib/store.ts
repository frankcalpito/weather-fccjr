import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(weatherApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
