import type { Mock } from "vitest";
import { screen, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = useRouter as Mock;

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("direct user to job results page with user's search parameters", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Vue Developer");

      const locationInput = screen.getByRole("textbox", {
        name: /where?/i,
      });
      await userEvent.type(locationInput, "Surabaya");

      const submitButton = screen.getByRole("button", {
        name: /search/i,
      });

      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Surabaya",
        },
      });
    });
  });
});
