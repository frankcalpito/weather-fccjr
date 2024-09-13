import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with children", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports different button types", () => {
    render(
      <Button onClick={() => {}} type="submit">
        Submit
      </Button>,
    );
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});
