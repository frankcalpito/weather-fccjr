import React, { useState, useEffect } from "react";
import { useGetLocationSuggestionsQuery } from "../../lib/api/locationApi";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const { data: suggestions, isFetching } = useGetLocationSuggestionsQuery(
    city,
    {
      skip: city.length < 3, // Skip fetching until user has typed at least 3 characters
    },
  );

  const handleAddLocation = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  const handleSuggestionClick = (suggestedCity: string) => {
    setCity(suggestedCity);
    setSuggestionsVisible(false);
    onSearch(suggestedCity);
  };

  useEffect(() => {
    if (city.length >= 3) {
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
    }
  }, [city]);

  return (
    <div className="flex flex-col space-y-2 relative">
      <div className="flex space-x-4">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full"
        />
        <Button onClick={handleAddLocation} className="bg-blue-500 text-white">
          Add
        </Button>
      </div>

      {/* Display location suggestions */}
      {suggestionsVisible && suggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto z-10">
          {isFetching ? (
            <li className="p-2">Loading...</li>
          ) : (
            suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() =>
                  handleSuggestionClick(suggestion.description.split(",")[0])
                }
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.description}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
