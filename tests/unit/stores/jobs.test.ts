import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import type { Mock } from "vitest";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { createJob } from "../../utils/createJobs";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Intern" }),
      ];
      const result = store.UNIQUE_JOB_TYPES;

      expect(result).toEqual(new Set(["Full-time", "Part-time", "Intern"]));
    });
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organization from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];
      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user not selected any organization", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const job = createJob({ organization: "Google" });

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const store = useJobsStore();
      const job = createJob({ organization: "Google" });

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user not selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();
        const job = createJob({ jobType: "Part-time" });

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Part-time", "Full-time"];
      const store = useJobsStore();
      const job = createJob({ jobType: "Full-time" });

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user not selected any job types", () => {
      it("includes degree", () => {
        const userStore = useUserStore();
        userStore.selectedDegrees = [];
        const store = useJobsStore();
        const job = createJob();

        const result = store.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });
    });
    it("identifies if job is associated with given degree", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Master's"];
      const store = useJobsStore();
      const job = createJob({ degree: "Master's" });

      const result = store.INCLUDE_JOB_BY_DEGREE(job);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("identifies if job matches user's skill", () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = "Vue";
      const jobsStore = useJobsStore();
      const job = createJob({ title: "Vue Developer" });
      const result = jobsStore.INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = "VuE";
      const jobsStore = useJobsStore();
      const job = createJob({ title: "Vue Developer" });
      const result = jobsStore.INCLUDE_JOB_BY_SKILL(job);

      expect(result).toBe(true);
    });

    describe("when the user has not entered any skill", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.skillsSearchTerm = "";
        const jobsStore = useJobsStore();
        const job = createJob({ title: "Vue Developer" });
        const result = jobsStore.INCLUDE_JOB_BY_SKILL(job);

        expect(result).toBe(true);
      });
    });
  });
});
