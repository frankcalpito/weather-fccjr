import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Tabs from "./Tabs";

describe("Tabs Component", () => {
  const mockTabs = [
    { label: "Tab 1", content: <div>Content for Tab 1</div> },
    { label: "Tab 2", content: <div>Content for Tab 2</div> },
    { label: "Tab 3", content: <div>Content for Tab 3</div> },
  ];

  it("renders the correct tab labels and initial content", () => {
    render(<Tabs tabs={mockTabs} />);

    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });

    // Check if the initial content for the first tab is rendered
    expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();
  });

  it("switches to the correct tab when clicked", () => {
    render(<Tabs tabs={mockTabs} />);

    expect(screen.getByText("Content for Tab 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));

    // After clicking Tab 2, Tab 1's content should be gone, and Tab 2's content should be visible
    expect(screen.queryByText("Content for Tab 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content for Tab 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 3"));

    // After clicking Tab 3, Tab 2's content should be gone, and Tab 3's content should be visible
    expect(screen.queryByText("Content for Tab 2")).not.toBeInTheDocument();
    expect(screen.getByText("Content for Tab 3")).toBeInTheDocument();
  });

  it("applies the correct styles to the active tab", () => {
    render(<Tabs tabs={mockTabs} />);

    const tab1Button = screen.getByText("Tab 1");
    const tab2Button = screen.getByText("Tab 2");

    expect(tab1Button).toHaveClass("bg-slate-800 text-white");
    expect(tab2Button).toHaveClass("bg-gray-200 text-gray-600");

    fireEvent.click(tab2Button);

    expect(tab1Button).toHaveClass("bg-gray-200 text-gray-600");
    expect(tab2Button).toHaveClass("bg-slate-800 text-white");
  });
});
