import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./features/weather/weatherApi";
import { locationApi } from "./features/location/locationApi";
import locationReducer from "./features/location/locationSlice"; // Import the location slice

export const makeStore = () => {
  return configureStore({
    reducer: {
      [weatherApi.reducerPath]: weatherApi.reducer,
      [locationApi.reducerPath]: locationApi.reducer,
      location: locationReducer,
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
