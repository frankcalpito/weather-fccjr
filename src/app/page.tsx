"use client";

import {
  addLocation,
  fetchWeatherForLocation,
} from "../lib/features/location/locationSlice";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Home = () => {
  const locations = useAppSelector((state) => state.location.locations);
  const dispatch = useAppDispatch();

  const handleAddLocation = async (location: {
    name: string;
    lat: number;
    long: number;
  }) => {
    dispatch(addLocation(location));
    dispatch(fetchWeatherForLocation(location));
  };

  return (
    <div className="container mx-auto min-h-screen p-10">
      <SearchBar onLocationSelected={handleAddLocation} />
      <div className="mt-8 space-y-4">
        {locations.map((location, index) => (
          <div key={index}>
            {!location.weather ? (
              <p>Loading weather for {location.name}...</p>
            ) : (
              <WeatherCard
                city={location.name}
                temp={location.weather.main.temp}
                description={location.weather.weather[0].description}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
