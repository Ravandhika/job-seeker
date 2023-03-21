import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("Locates element in list and return the next element in list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("when element is at the end of the list ", () => {
    it("Locates next element at the start of list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });
});
