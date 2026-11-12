import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  it("displays all navigation links", () => {
    render(<Header />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("opens and closes the mobile menu", () => {
    render(<Header />);

    const menuButton = screen.getAllByRole("button", {
 	 name: "Ouvrir le menu",
	})[0];

    const nav = screen.getAllByRole("navigation")[0];

    expect(nav).toHaveClass("nav");

    fireEvent.click(menuButton);
    expect(nav).toHaveClass("open");

    fireEvent.click(nav.querySelector('a[href="#about"]')!);
    expect(nav).toHaveClass("nav");
    expect(nav).not.toHaveClass("open");
  });
});

describe("Required checks demonstration", () => {
  it("fails intentionally to demonstrate PR protection", () => {
    expect(true).toBe(false);
  });
});
