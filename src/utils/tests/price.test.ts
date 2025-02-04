import { calculateSubscriptionPrice } from "../price";

describe("calculateSubscriptionPrice", () => {
  it("should calculate the subscription price correctly with 25% discount", () => {
    expect(calculateSubscriptionPrice(100, 25)).toBe(75.00);
  });

  it("should calculate the subscription price correctly with 0% discount", () => {
    expect(calculateSubscriptionPrice(100, 0)).toBe(100.00);
  });

  it("should calculate the subscription price correctly with 100% discount", () => {
    expect(calculateSubscriptionPrice(100, 100)).toBe(0.00);
  });

  it("should handle decimal base prices", () => {
    expect(calculateSubscriptionPrice(99.99, 10)).toBe(89.99);
  });

  it("should handle decimal discount percentages", () => {
    expect(calculateSubscriptionPrice(100, 33.33)).toBe(66.67);
  });

  it("should handle small amounts", () => {
    expect(calculateSubscriptionPrice(1, 10)).toBe(0.90);
  });

  it("should handle zero base price", () => {
    expect(calculateSubscriptionPrice(0, 25)).toBe(0.00);
  });
});
