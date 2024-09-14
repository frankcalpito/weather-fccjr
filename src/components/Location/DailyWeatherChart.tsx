import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTemperatureLow,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { DailyData } from "@/lib/features/weather/weatherApi";

interface DailyWeatherChartProps {
  daily: DailyData[];
}

const DailyWeatherChart: React.FC<DailyWeatherChartProps> = ({ daily }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md pt-4">
      <h3 className="text-lg font-semibold ml-4 mb-2 text-white">Daily data</h3>
      <div className="flex overflow-x-auto space-x-4 p-4 bg-slate-700">
        {daily.map((day, index) => (
          <div
            key={index}
            className="bg-white w-40 md:w-60 flex-shrink-0 border rounded-lg p-2 shadow-md grid grid-cols-1 md:grid-cols-2"
          >
            <div className="text-sm md:col-span-2 text-center border-b pb-2 mb-2 border-blue-200">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </div>
            <div className="flex items-center mb-1 justify-center">
              <FontAwesomeIcon
                icon={faTemperatureHigh}
                className="mr-1 text-sm"
              />
              <span className="text-sm">Day: {day.temp.day}°C</span>
            </div>
            <div className="flex items-center mb-1 justify-center">
              <FontAwesomeIcon
                icon={faTemperatureLow}
                className="mr-1 text-sm"
              />
              <span className="text-sm">Night: {day.temp.night}°C</span>
            </div>
            <div className="flex items-center mb-1 md:col-span-2 justify-center">
              <FontAwesomeIcon icon={faWater} className="mr-1 text-sm" />
              <span className="text-sm">{day.humidity}% Humidity</span>
            </div>
            <div className="text-sm mb-1 text-center md:col-span-2">
              {day.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeatherChart;
