import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Job } from "@/api/types";
import JobListingCard from "@/components/JobResults/JobListingCard.vue";
import { createJob } from "../../../utils/createJobs";

describe("JobListingCard", () => {
  const renderJobListingCard = (job: Job) => {
    render(JobListingCard, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("renders job Titles", () => {
    const jobProps = createJob({ title: "Vue Programmer" });
    renderJobListingCard(jobProps);
    expect(screen.getByText("Vue Programmer")).toBeInTheDocument;
  });
  it("renders Job Organization", () => {
    const jobProps = createJob({ organization: "Ubisoft" });
    renderJobListingCard(jobProps);
    expect(screen.getByText("Ubisoft")).toBeInTheDocument;
  });
  it("renders Job Location", () => {
    const jobProps = createJob({ locations: ["Surabaya", "Malang"] });
    renderJobListingCard(jobProps);
    expect(screen.getByText("Surabaya")).toBeInTheDocument;
    expect(screen.getByText("Malang")).toBeInTheDocument;
  });
  it("renders Job qualification", () => {
    const jobProps = createJob({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListingCard(jobProps);
    expect(screen.getByText("Code")).toBeInTheDocument;
    expect(screen.getByText("Develop")).toBeInTheDocument;
  });
});
