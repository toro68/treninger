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
  it("announces expanded state and menu semantics", () => {
    renderMenu();

    expect(screen.getByRole("button", { name: "Del økt" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("menu", { name: "Del økt" })).toBeInTheDocument();
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
