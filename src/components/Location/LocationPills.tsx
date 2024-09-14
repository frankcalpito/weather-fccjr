import React from "react";
import { useDispatch } from "react-redux";
import { removeLocation } from "../../lib/features/location/locationSlice";

interface LocationPillsProps {
  locations: { name: string; lat: number; long: number }[];
}

const LocationPills: React.FC<LocationPillsProps> = ({ locations }) => {
  const dispatch = useDispatch();

  const handleRemoveLocation = (lat: number, long: number) => {
    dispatch(removeLocation({ lat, long }));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 mt-4">
      {locations.map((location, index) => (
        <div
          key={index}
          className="bg-blue-500 text-white py-1 px-3 rounded-full flex items-center space-x-2 cursor-pointer"
          onClick={() => handleRemoveLocation(location.lat, location.long)}
        >
          <span>{location.name}</span>
          <span className="text-lg">&times;</span>
        </div>
      ))}
    </div>
  );
};

export default LocationPills;
