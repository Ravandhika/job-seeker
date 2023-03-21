import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
import { ref } from "vue";

describe("usePreviousAndNextPages", () => {
  it("calculates page before current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(10);
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is the first page", () => {
    it("does not provides previous page", () => {
      const currentPage = ref(1);
      const maxPage = ref(1);
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });
  it("calculates page after current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(10);
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });
  describe("when current page is the last page", () => {
    it("does not provides next page", () => {
      const currentPage = ref(8);
      const maxPage = ref(8);
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
