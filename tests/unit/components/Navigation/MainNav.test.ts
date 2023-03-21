import { render, screen } from "@testing-library/vue";
import UserEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { Mock } from "vitest";

import MainNav from "@/components/Navigation/MainNav.vue";
import { useUserStore } from "@/stores/user";

import { useRoute } from "vue-router";
vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    useRouteMock.mockReturnValue({ name: "Home" });
    const pinia = createTestingPinia();

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("display company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Ravan Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("display menu item for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuText = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuText).toEqual([
      "Teams",
      "Locations",
      "Life at Ravan Careers",
      "How we hire",
      "Jobs",
    ]);
  });

  describe("when user logs in", () => {
    it("display user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      userStore.isLoggedIn = true;
      await UserEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
