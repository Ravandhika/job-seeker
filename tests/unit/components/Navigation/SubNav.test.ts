import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import type { Mock } from "vitest";

import SubNav from "@/components/Navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";

import { useRoute } from "vue-router";
vi.mock("vue-router");
const useRouteMock = useRoute as Mock;

describe("SubNav", () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    render(SubNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  describe("when user is on jobs page", () => {
    it("display job counts", async () => {
      useRouteMock.mockReturnValue({ name: "JobResults" });
      const { jobsStore } = renderTheSubnav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is  not on jobs page", () => {
    it("does not display job counts", () => {
      useRouteMock.mockReturnValue({ name: "Home" });
      const { jobsStore } = renderTheSubnav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is read only
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
