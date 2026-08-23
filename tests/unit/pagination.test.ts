import {
  describe,
  expect,
  it
} from "vitest";

import {
  getPagination
} from "../../src/utils/pagination.js";

describe("Pagination", () => {

  it("should calculate pagination correctly", () => {
    expect(
      getPagination(2, 20)
    ).toEqual({
      page: 2,
      limit: 20,
      skip: 20
    });
  });

  it("should default to page 1", () => {
    expect(
      getPagination()
    ).toEqual({
      page: 1,
      limit: 20,
      skip: 0
    });
  });

  it("should prevent page below 1", () => {
    expect(
      getPagination(0, 20)
    ).toEqual({
      page: 1,
      limit: 20,
      skip: 0
    });
  });

  it("should limit maximum page size", () => {
    expect(
      getPagination(1, 500)
    ).toEqual({
      page: 1,
      limit: 100,
      skip: 0
    });
  });

});