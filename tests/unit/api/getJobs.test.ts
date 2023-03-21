import type { Mock } from "vitest";
import axios from "axios";

import getJobs from "@/api/getJobs";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getJobs", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Java Engineer",
        },
      ],
    });
  });
  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extract jobs from response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "Java Engineer",
      },
    ]);
  });
});
