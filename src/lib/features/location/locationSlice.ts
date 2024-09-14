import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi, WeatherCurrent, HourlyData } from "../weather/weatherApi";

export interface Location {
  name: string;
  lat: number;
  long: number;
  weather?: {
    current: WeatherCurrent;
    hourly: HourlyData[];
  };
}

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [],
};

// Thunk to fetch weather using RTK Query's endpoint
export const fetchWeatherForLocation = createAsyncThunk(
  "location/fetchWeatherForLocation",
  async (
    location: { name: string; lat: number; long: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { lat, long } = location;
      const result = await dispatch(
        weatherApi.endpoints.getWeatherByCoords.initiate({ lat, long }),
      ).unwrap(); // Need to unwrap to resolve the promise

      return { ...location, weather: result }; // Return the location with weather data
    } catch (error) {
      return rejectWithValue("Failed to fetch weather data");
    }
  },
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      // Add location if it doesn't exist yet
      const existingLocation = state.locations.find(
        (loc) =>
          loc.lat === action.payload.lat && loc.long === action.payload.long,
      );
      if (!existingLocation) {
        state.locations.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherForLocation.fulfilled, (state, action) => {
      const index = state.locations.findIndex(
        (loc) =>
          loc.lat === action.payload.lat && loc.long === action.payload.long,
      );
      if (index !== -1) {
        state.locations[index] = action.payload; // Update with weather data
      }
    });
  },
});

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;
