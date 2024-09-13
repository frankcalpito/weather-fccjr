import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  it("renders with initial value", () => {
    render(<Input value="Test" onChange={() => {}} />);
    const input = screen.getByDisplayValue("Test");
    expect(input).toBeInTheDocument();
  });

  it("updates value when typing", () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("supports different types of input", () => {
    render(<Input value="123" type="number" onChange={() => {}} />);
    const input = screen.getByDisplayValue("123");
    expect(input).toHaveAttribute("type", "number");
  });
});
