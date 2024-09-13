"use client";

import { useState } from "react";
import { useGetWeatherByCityQuery } from "../lib/api/weatherApi";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = () => {
  const [city, setCity] = useState("London");
  const { data, error, isLoading } = useGetWeatherByCityQuery(city);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching weather data</p>
        ) : (
          data && (
            <WeatherCard
              city={data.name}
              temp={data.main.temp}
              description={data.weather[0].description}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
