"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import {
  addLocation,
  fetchWeatherForLocation,
} from "../lib/features/location/locationSlice";
import LocationCard from "../components/Location/LocationCard";
import SearchBar from "../components/SearchBar/SearchBar";
import Spinner from "../components/Spinner/Spinner";
import LocationPills from "../components/Location/LocationPills";

const Home = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const dispatch: AppDispatch = useDispatch();

  // Track loading state for weather data
  const weatherLoading = locations.some((loc) => !loc.weather);

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
    <div className="container mx-auto min-h-screen p-2 md:p-10">
      <SearchBar onLocationSelected={handleAddLocation} />
      <LocationPills locations={locations} />
      <div
        className={`mt-8 gap-4 grid grid-cols-1 ${locations.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {weatherLoading ? (
          <Spinner /> // Show spinner while weather data is loading
        ) : locations.length > 0 ? (
          locations.map((location, index) => (
            <div key={index} className="">
              {location.weather ? (
                <LocationCard location={location} />
              ) : (
                <p>Loading weather for {location.name}...</p>
              )}
            </div>
          ))
        ) : (
          <div className="mx-auto p-4 shadow-md rounded-lg flex justify-center">
            Please search and select a location
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
