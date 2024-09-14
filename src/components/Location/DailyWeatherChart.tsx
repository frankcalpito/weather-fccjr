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
      <h3 className="text-lg font-semibold ml-4 mb-2 text-white">
        Daily Data:
      </h3>
      <div className="flex overflow-x-auto space-x-4 p-4 bg-slate-700">
        {daily.map((day, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-2 shadow-md flex flex-wrap justify-center"
          >
            <div className="text-sm mb-1">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </div>
            <div className="flex items-center mb-1">
              <FontAwesomeIcon
                icon={faTemperatureHigh}
                className="mr-1 text-sm"
              />
              <span className="text-sm">Day: {day.temp.day}°C</span>
            </div>
            <div className="flex items-center mb-1">
              <FontAwesomeIcon
                icon={faTemperatureLow}
                className="mr-1 text-sm"
              />
              <span className="text-sm">Night: {day.temp.night}°C</span>
            </div>
            <div className="flex items-center mb-1">
              <FontAwesomeIcon icon={faWater} className="mr-1 text-sm" />
              <span className="text-sm">{day.humidity}% Humidity</span>
            </div>
            <div className="text-sm mb-1">{day.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeatherChart;
