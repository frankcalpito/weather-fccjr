import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faWater } from "@fortawesome/free-solid-svg-icons";

interface HourlyWeatherChartProps {
  hourly: {
    temp: number;
    feels_like: number;
    humidity: number;
  }[];
}

const HourlyWeatherChart: React.FC<HourlyWeatherChartProps> = ({ hourly }) => {
  return (
    <div className="mt-8 bg-gray-800 rounded-lg shadow-md pt-4">
      <h3 className="text-lg font-semibold ml-4 mb-2 text-white">
        Hourly Data:
      </h3>
      <div className="flex overflow-x-auto space-x-4 p-4 bg-slate-700">
        {hourly.map((hour, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-2 shadow-md flex flex-wrap justify-center"
          >
            <div className="text-sm mb-1">{index}:00</div>
            <div className="flex items-center mb-1">
              <FontAwesomeIcon
                icon={faTemperatureHigh}
                className="mr-1 text-sm"
              />
              <span className="text-sm"> {hour.temp}°C</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faWater} className="mr-1 text-sm" />
              <span className="text-sm">{hour.humidity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeatherChart;
