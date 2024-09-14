import React, { useState, useEffect, useRef } from "react";
import {
  useGetLocationSuggestionsQuery,
  useGetLocationQuery,
} from "../../lib/features/location/locationApi";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface SearchBarProps {
  onLocationSelected: (location: {
    name: string;
    lat: number;
    long: number;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelected }) => {
  const [location, setLocation] = useState("");
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null); // Ref to the search bar element

  const { data: suggestions, isFetching } = useGetLocationSuggestionsQuery(
    location,
    {
      skip: location.length < 3,
    },
  );

  const { data: placeDetails } = useGetLocationQuery(placeId ?? "", {
    skip: !placeId, // Skip fetching if no placeId is set
  });

  const handleSuggestionClick = (suggestedCity: string, id: string) => {
    setLocation(suggestedCity);
    setPlaceId(id);
    setSuggestionsVisible(false);
  };

  useEffect(() => {
    if (placeDetails?.result.geometry) {
      const { lat, lng } = placeDetails.result.geometry.location;
      onLocationSelected({
        name: location,
        lat: typeof lat === "function" ? lat() : (lat as number),
        long: typeof lng === "function" ? lng() : (lng as number),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeDetails]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    if (e.target.value.length >= 3) {
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    if (location.length >= 3) {
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setSuggestionsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-2 relative" ref={searchBarRef}>
      <div className="flex space-x-4 w-full relative justify-end">
        <Input
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="w-full"
        />
        <Button
          onClick={() => placeId && handleSuggestionClick(location, placeId)}
          className="bg-blue-500 text-white w-40"
        >
          Add location
        </Button>
        {suggestionsVisible && suggestions && suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto z-10">
            {isFetching ? (
              <li className="p-2">Loading...</li>
            ) : (
              suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion.description,
                      suggestion.place_id,
                    )
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
    </div>
  );
};

export default SearchBar;
