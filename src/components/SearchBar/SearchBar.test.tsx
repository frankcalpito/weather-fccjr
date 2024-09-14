import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders input and button", () => {
    render(<SearchBar onLocationSelected={() => {}} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls onSearch with the correct city when search button is clicked", () => {
    const handleSelect = jest.fn();
    render(<SearchBar onLocationSelected={handleSelect} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    expect(handleSelect).toHaveBeenCalledWith("London");
  });

  it("does not call onSearch if input is empty", () => {
    const handleSelect = jest.fn();
    render(<SearchBar onLocationSelected={handleSelect} />);

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(handleSelect).not.toHaveBeenCalled();
  });
});
