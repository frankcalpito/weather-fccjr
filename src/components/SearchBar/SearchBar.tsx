import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="flex space-x-4">
      <Input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="w-full"
      />
      <Button onClick={handleSearch} className="bg-blue-500 text-white">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
