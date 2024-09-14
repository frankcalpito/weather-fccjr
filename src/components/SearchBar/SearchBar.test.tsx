import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  useGetLocationSuggestionsQuery,
  useGetLocationQuery,
  useFetchMyLocationQuery,
} from "../../lib/features/location/locationApi";
import SearchBar from "./SearchBar";

jest.mock("../../lib/features/location/locationApi");

describe("SearchBar", () => {
  let mockOnLocationSelected = jest.fn();

  const mockSuggestions = [
    { place_id: "1", description: "New York" },
    { place_id: "2", description: "Los Angeles" },
  ];

  const mockPlaceDetails = {
    result: {
      geometry: { location: { lat: () => 40.7128, lng: () => -74.006 } },
    },
  };

  const mockCurrentLocation = {
    lat: 51.5074,
    long: -0.1278,
  };

  beforeEach(() => {
    (useGetLocationSuggestionsQuery as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      isFetching: false,
    });

    (useGetLocationQuery as jest.Mock).mockReturnValue({
      data: mockPlaceDetails,
    });

    (useFetchMyLocationQuery as jest.Mock).mockReturnValue({
      data: mockCurrentLocation,
      isFetching: false,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders input field and placeholder", () => {
    render(<SearchBar onLocationSelected={mockOnLocationSelected} />);

    const input = screen.getByPlaceholderText(
      "Enter a location to be added to the list",
    );
    expect(input).toBeInTheDocument();
  });

  it("fetches suggestions when typing a location", async () => {
    render(<SearchBar onLocationSelected={mockOnLocationSelected} />);

    const input = screen.getByPlaceholderText(
      "Enter a location to be added to the list",
    );
    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    });
  });

  it("selects a suggestion and triggers onLocationSelected", async () => {
    // Reset the mock function
    mockOnLocationSelected = jest.fn();

    render(<SearchBar onLocationSelected={mockOnLocationSelected} />);

    const input = screen.getByPlaceholderText(
      "Enter a location to be added to the list",
    );
    fireEvent.change(input, { target: { value: "New" } });

    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New York"));

    await waitFor(() => {
      expect(mockOnLocationSelected).toHaveBeenCalledTimes(2); // 1 - during init, 2 - when location selected
    });
  });

  it("fetches current location data and calls onLocationSelected", async () => {
    render(<SearchBar onLocationSelected={mockOnLocationSelected} />);

    await waitFor(() => {
      expect(mockOnLocationSelected).toHaveBeenCalledWith({
        name: "Current Location",
        lat: 51.5074,
        long: -0.1278,
      });
    });
  });

  it("does not show suggestions when input length is less than 3 characters", async () => {
    render(<SearchBar onLocationSelected={mockOnLocationSelected} />);

    const input = screen.getByPlaceholderText(
      "Enter a location to be added to the list",
    );
    fireEvent.change(input, { target: { value: "Ne" } });

    await waitFor(() => {
      expect(screen.queryByText("New York")).not.toBeInTheDocument();
    });
  });
});
