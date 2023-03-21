import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";
import { useDegreesStore } from "@/stores/degrees";

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const degreesStore = useDegreesStore();
    // @ts-expect-error: Getter is ReadOnly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
    });

    return { jobsStore, degreesStore };
  };
  it("It fetch degrees ", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { degreesStore } = renderJobListings();

    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("It fetch jobs ", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { jobsStore } = renderJobListings();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("It displays maximum 10 jobs per page", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });

    const { jobsStore } = renderJobListings();
    // @ts-expect-error: Getter is ReadOnly
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when Params exclude page number", () => {
    it("display page number 1", () => {
      useRouteMock.mockReturnValue({ query: { page: undefined } });

      renderJobListings();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("display page number", () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });

      renderJobListings();

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on the first page", () => {
    it("does not show link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is ReadOnly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument;
    });

    it("shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is ReadOnly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument;
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is ReadOnly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument;
    });

    it("show link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error: Getter is ReadOnly
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument;
    });
  });
});
