import React from "react";
import { Location } from "@/lib/features/location/locationSlice";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-700 border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{location.name}</h2>
      <p className="text-lg">Temperature: {location.weather.current.temp}°C</p>
      <p className="text-md">
        Description: {location.weather.current.weather[0].description}
      </p>
    </div>
  );
};

export default LocationCard;
