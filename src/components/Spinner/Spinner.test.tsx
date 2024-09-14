import React from "react";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner Component", () => {
  it("renders the spinner div with the correct classes", () => {
    const { container } = render(<Spinner />);

    const spinnerDiv = container.querySelector("div > div > div"); // jest render seems to create a ghost div

    expect(spinnerDiv).toBeInTheDocument();
    expect(spinnerDiv).toHaveClass(
      "border-t-transparent border-solid animate-spin border-blue-500 border-8 rounded-full h-16 w-16",
    );
  });
});
