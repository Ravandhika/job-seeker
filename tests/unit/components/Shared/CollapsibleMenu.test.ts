import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import collapsibleMenu from "@/components/Shared/CollapsibleMenu.vue";

describe("Collapsible menu", () => {
  const renderCollapsibleMenu = (config = {}) => {
    render(collapsibleMenu, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
      ...config,
    });
  };

  it("render child content", async () => {
    const props = {
      header: "My Category",
    };
    const slot = {
      default: "<h3>My nested child</h3>",
    };
    const config = { props, slot };

    renderCollapsibleMenu(config);
    expect(screen.queryByText("My nested child")).not.toBeInTheDocument;

    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested child")).toBeInTheDocument;
  });

  describe("when parent does not provide ustom child content", () => {
    it("it render default content", async () => {
      const props = {
        header: "My Category",
      };
      const slots = {};
      const config = { props, slots };

      renderCollapsibleMenu(config);

      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(
        screen.getByText("Whoops, somebody forget to populate me!")
      ).toBeInTheDocument();
    });
  });
});
