import React from "react";

interface WeatherCardProps {
  city: string;
  temp: number;
  description: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temp,
  description,
}) => {
  return (
    <div className="bg-blue-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-xl">{temp}°C</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default WeatherCard;
