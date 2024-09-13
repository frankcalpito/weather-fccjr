import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi";
import { locationApi } from "./api/locationApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [weatherApi.reducerPath]: weatherApi.reducer,
      [locationApi.reducerPath]: locationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        weatherApi.middleware,
        locationApi.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
