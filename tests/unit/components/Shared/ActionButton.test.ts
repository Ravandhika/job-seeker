import { render, screen } from "@testing-library/vue";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("Action Button", () => {
  it("render text", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });
    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument;
  });

  it("applies styles of button", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });

    const button = screen.getByRole("button", {
      name: /click me/i,
    });

    expect(button).toHaveClass("primary");
  });
});
