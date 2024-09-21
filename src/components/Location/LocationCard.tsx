import { Location } from "@/lib/features/location/locationSlice";
import React from "react";
import Tabs from "../Tabs/Tabs";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyWeatherChart from "./DailyWeatherChart";
import HourlyWeatherChart from "./HourlyWeatherChart";

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
    <div className="bg-gradient-to-r from-secondary-600 to-primary-700 border py-4 px-2 md:p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <CurrentWeatherCard current={current} />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default LocationCard;
