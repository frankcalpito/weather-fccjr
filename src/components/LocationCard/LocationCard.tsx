import React from "react";
import { Location } from "@/lib/features/location/locationSlice";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyWeatherChart from "./HourlyWeatherChart";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { name, weather } = location;
  const { current, hourly } = weather;

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-700 border p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <CurrentWeatherCard current={current} />
      <HourlyWeatherChart hourly={hourly} />
    </div>
  );
};

export default LocationCard;
