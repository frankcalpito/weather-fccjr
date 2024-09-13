import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders input and button", () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls onSearch with the correct city when search button is clicked", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("London");
  });

  it("does not call onSearch if input is empty", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(handleSearch).not.toHaveBeenCalled();
  });
});
