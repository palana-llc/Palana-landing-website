import { describe, it, expect } from "vitest";
import { buildDotEntries } from "./Pagination";

describe("buildDotEntries", () => {
  describe("edge cases", () => {
    it("returns [1] when total is 0", () => {
      expect(buildDotEntries(1, 0)).toEqual([1]);
    });

    it("returns [1] when total is 1", () => {
      expect(buildDotEntries(1, 1)).toEqual([1]);
    });

    it("returns all pages when total is 11", () => {
      expect(buildDotEntries(1, 11)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it("returns all pages when total is 10", () => {
      expect(buildDotEntries(5, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe("ellipsis insertion (total > 11)", () => {
    it("inserts ellipsis between first cluster and current when current is far from start", () => {
      // always shows pages 1,2 + last 2 + current±1; result = [1,2,…,7,8,9,…,19,20]
      const result = buildDotEntries(8, 20);
      expect(result[0]).toBe(1);
      expect(result[2]).toBe("ellipsis");
    });

    it("inserts ellipsis between current and last cluster when current is far from end", () => {
      // result = [1,2,…,7,8,9,…,19,20]; ellipsis is at index length-3
      const result = buildDotEntries(8, 20);
      expect(result[result.length - 1]).toBe(20);
      expect(result[result.length - 3]).toBe("ellipsis");
    });

    it("always includes page 1 and the last page", () => {
      const result = buildDotEntries(10, 20);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(20);
    });

    it("always includes current page and its neighbors", () => {
      const result = buildDotEntries(10, 20);
      expect(result).toContain(9);
      expect(result).toContain(10);
      expect(result).toContain(11);
    });

    it("shows one ellipsis when current is near the start", () => {
      // current=2 → show = {1,2,3,19,20}; result = [1,2,3,…,19,20]
      const result = buildDotEntries(2, 20);
      expect(result).toEqual([1, 2, 3, "ellipsis", 19, 20]);
    });

    it("no consecutive ellipsis entries", () => {
      for (let page = 1; page <= 20; page++) {
        const result = buildDotEntries(page, 20);
        for (let i = 0; i < result.length - 1; i++) {
          if (result[i] === "ellipsis") {
            expect(result[i + 1]).not.toBe("ellipsis");
          }
        }
      }
    });

    it("page numbers are in ascending order (ignoring ellipsis)", () => {
      const result = buildDotEntries(10, 20);
      const nums = result.filter((e): e is number => e !== "ellipsis");
      expect(nums).toEqual([...nums].sort((a, b) => a - b));
    });

    it("no duplicate page numbers", () => {
      const result = buildDotEntries(10, 20);
      const nums = result.filter((e): e is number => e !== "ellipsis");
      expect(nums.length).toBe(new Set(nums).size);
    });
  });

  describe("boundary positions", () => {
    it("current on first page", () => {
      const result = buildDotEntries(1, 20);
      expect(result[0]).toBe(1);
      expect(result).toContain(2);
    });

    it("current on last page", () => {
      const result = buildDotEntries(20, 20);
      expect(result[result.length - 1]).toBe(20);
      expect(result).toContain(19);
    });

    it("current at exact midpoint", () => {
      const result = buildDotEntries(10, 20);
      expect(result).toContain(10);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(20);
    });
  });
});
