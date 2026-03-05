import { render, screen } from '@testing-library/react';
import React from "react";

describe("Thing", () => {
  it("renders without crashing", () => {
    render(<div>Test</div>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
