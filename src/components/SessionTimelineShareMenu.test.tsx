import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SessionTimelineShareMenu } from "./SessionTimelineShareMenu";

const renderMenu = () => {
  const onToggle = vi.fn();
  const onClose = vi.fn();
  const onCopyCompact = vi.fn();
  const onCopyLink = vi.fn();
  const onPrint = vi.fn();

  render(
    <div>
      <SessionTimelineShareMenu
        fullSessionShareUrl="https://example.com/okt?s=test"
        showShareOptions
        onToggle={onToggle}
        onClose={onClose}
        onCopyCompact={onCopyCompact}
        onCopyLink={onCopyLink}
        onPrint={onPrint}
      />
      <button type="button">Utenfor</button>
    </div>
  );

  return { onToggle, onClose, onCopyCompact, onCopyLink, onPrint };
};

describe("SessionTimelineShareMenu", () => {
  it("announces expanded state and share options without menu semantics", () => {
    renderMenu();

    const toggle = screen.getByRole("button", { name: "Del økt" });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).not.toHaveAttribute("aria-haspopup");
    expect(screen.getByRole("group", { name: "Del økt" })).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes when the user presses escape", () => {
    const { onClose } = renderMenu();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the user clicks outside the menu", () => {
    const { onClose } = renderMenu();

    fireEvent.mouseDown(screen.getByRole("button", { name: "Utenfor" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
