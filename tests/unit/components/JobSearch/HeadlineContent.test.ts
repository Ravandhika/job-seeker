import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue";

import HeadlineContent from "@/components/JobSearch/HeadlineContent.vue";

describe("HeadLineContent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("Display introductory headline content verb", () => {
    render(HeadlineContent);

    const contentPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(contentPhrase).toBeInTheDocument();
  });

  it("changes headline content verb at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(HeadlineContent);

    expect(mock).toHaveBeenCalled();
  });

  it("swaps headline content verb after interval", async () => {
    render(HeadlineContent);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const contentPhrase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(contentPhrase).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(HeadlineContent);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
