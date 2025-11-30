import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MindsetSection } from "./MindsetSection";

describe("MindsetSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the main heading", () => {
    render(<MindsetSection />);
    // Component starts collapsed, showing "Mindset og mentaltrening"
    expect(screen.getByText("Mindset og mentaltrening")).toBeInTheDocument();
  });

  it("should render description text", () => {
    render(<MindsetSection />);
    
    expect(screen.getByText(/Tankesett, tilbakemeldinger og garderobepraten/i)).toBeInTheDocument();
  });

  it("should have expand button when collapsed", () => {
    render(<MindsetSection />);
    
    // Should show + when collapsed
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("should expand when clicking header", () => {
    render(<MindsetSection />);
    
    // Click to expand
    const expandButton = screen.getByTestId("mindset-toggle");
    fireEvent.click(expandButton);
    
    // After expanding, should show category filter chips
    const categoryChips = screen.getAllByText("Tankesett");
    expect(categoryChips.length).toBeGreaterThan(0);
  });

  it("should show content after expanding", () => {
    render(<MindsetSection />);
    
    // Click to expand
    const expandButton = screen.getByTestId("mindset-toggle");
    fireEvent.click(expandButton);
    
    // Should now show the tab buttons
    expect(screen.getByRole("button", { name: "Tilbakemelding" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verktøy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Garderobepraten" })).toBeInTheDocument();
  });

  it("should toggle between collapsed and expanded", () => {
    render(<MindsetSection />);
    
    const headerButton = screen.getByTestId("mindset-toggle");
    
    // Initially shows +
    expect(screen.getByText("+")).toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(headerButton);
    
    // Now should show - and content
    expect(screen.getByText("−")).toBeInTheDocument();
  });
});
