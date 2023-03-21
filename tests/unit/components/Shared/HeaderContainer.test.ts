import { screen, render } from "@testing-library/vue";

import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allows parent component to provide title content", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h1>Some Title</h1>",
      },
    });
    expect(screen.getByText("Some Title")).toBeInTheDocument;
  });

  it("allows parent component to provide subtitle content", () => {
    render(HeaderContainer, {
      slots: {
        subtitle: "<h2>Some subtitle</h2>",
      },
    });
    expect(screen.getByText("Some subtitle")).toBeInTheDocument;
  });
});
