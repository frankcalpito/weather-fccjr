import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import {
  faTemperatureHigh,
  faCloud,
  faTemperature2,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

interface CurrentWeatherCardProps {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    sunrise: number;
    sunset: number;
    weather: { description: string; icon: string }[];
  };
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ current }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTemperatureHigh} className="mr-2 text-lg" />
          <span className="text-md">Temperature: {current.temp}°C</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCloud} className="mr-2 text-lg" />
          <span className="text-md">
            Description: {current.weather[0].description}
          </span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTemperature2} className="mr-2 text-lg" />
          <span className="text-md">Feels Like: {current.feels_like}°C</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faWater} className="mr-2 text-lg" />
          <span className="text-md">Humidity: {current.humidity}%</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSun} className="mr-2 text-lg" />
          <span className="text-md">
            Sunrise: {formatTime(current.sunrise)}
          </span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSun} className="mr-2 text-lg rotate-180" />
          <span className="text-md">Sunset: {formatTime(current.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
