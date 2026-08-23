import {
  describe,
  expect,
  it
} from "vitest";

import {
  createTaskSchema
} from "../../src/validators/task.validator";

describe("Task assignment validation", () => {

  it("should accept a valid assignee", () => {
    const result = createTaskSchema.safeParse({
      title: "Build authentication",
      description: "Implement JWT authentication",
      priority: "high",
      assigneeId: "550e8400-e29b-41d4-a716-446655440000"
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid assignee ID", () => {
    const result = createTaskSchema.safeParse({
      title: "Build authentication",
      assigneeId: "invalid-id"
    });

    expect(result.success).toBe(false);
  });

  it("should reject empty task title", () => {
    const result = createTaskSchema.safeParse({
      title: ""
    });

    expect(result.success).toBe(false);
  });

});