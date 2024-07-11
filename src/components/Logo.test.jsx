import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Logo } from "./Logo";

// Mock image imports
vi.mock("../assets/logo-dark.svg", () => ({ default: "dark-logo-path" }));
vi.mock("../assets/logo-light.svg", () => ({ default: "light-logo-path" }));

test("renders the light logo image", () => {
  render(<Logo />);
  const imgElement = screen.getByAltText("logo");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute("src", "light-logo-path");
});
