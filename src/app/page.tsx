"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import {
  addLocation,
  fetchWeatherForLocation,
} from "../lib/features/location/locationSlice";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import SearchBar from "../components/SearchBar/SearchBar";
import Spinner from "../components/Spinner/Spinner";

const Home = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const dispatch: AppDispatch = useDispatch();

  // Track loading state for weather data
  const weatherLoading = locations.some((loc) => loc.weather === undefined);

  const handleAddLocation = (location: {
    name: string;
    lat: number;
    long: number;
  }) => {
    // Add location to Redux store
    dispatch(addLocation(location));

    // Fetch weather data for the location
    dispatch(fetchWeatherForLocation(location));
  };

  return (
    <div className="container mx-auto min-h-screen p-10">
      <SearchBar onLocationSelected={handleAddLocation} />
      <div className="mt-8 space-y-4">
        {weatherLoading ? (
          <Spinner /> // Show spinner while weather data is loading
        ) : (
          locations.map((location, index) => (
            <div key={index}>
              {location.weather ? (
                <WeatherCard
                  city={location.name}
                  temp={location.weather.main.temp}
                  description={location.weather.weather[0].description}
                />
              ) : (
                <p>Loading weather for {location.name}...</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
