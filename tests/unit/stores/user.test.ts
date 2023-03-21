import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });
  it("stores organizations that user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });
  it("stores job stypes that user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that user woild like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it("store's user's search term for skills and qualifications", () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has choosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Google", "Amazon"]);
      expect(store.selectedOrganizations).toEqual(["Google", "Amazon"]);
    });
  });

  describe("ADD_SELECTED_JOBS_TYPES", () => {
    it("updates job types the user has choosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Intern", "Part-time", "Full-time"]);
      expect(store.selectedJobTypes).toEqual([
        "Intern",
        "Part-time",
        "Full-time",
      ]);
    });
  });

  describe("ADD_SELECTED_DEGREE", () => {
    it("updates job types the user has choosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"]);
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives search term for skills the user has entered", () => {
      const store = useUserStore();
      store.skillsSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");
      expect(store.skillsSearchTerm).toBe("Vue");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTION", () => {
    it("removes all job filters that user has choosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Random Degree"];
      store.selectedJobTypes = ["Random job type"];
      store.selectedOrganizations = ["Random Organizations"];
      store.skillsSearchTerm = "Vue Developer";

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();
      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toBe("");
    });
  });
});
