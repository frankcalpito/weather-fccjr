import React from "react";
import { Location } from "@/lib/features/location/locationSlice";
import CurrentWeatherCard from "./CurrentWeatherCard";
import HourlyWeatherChart from "./HourlyWeatherChart";
import DailyWeatherChart from "./DailyWeatherChart";
import Tabs from "../Tabs/Tabs";

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { name, weather } = location;
  const { current, hourly, daily } = weather!;

  const tabs = [
    {
      label: "Hourly",
      content: <HourlyWeatherChart hourly={hourly} />,
    },
    {
      label: "Daily",
      content: <DailyWeatherChart daily={daily} />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-700 border p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <CurrentWeatherCard current={current} />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default LocationCard;
