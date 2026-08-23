import { describe, expect, it } from "vitest";

import {
  hashPassword,
  comparePassword
} from "../../src/utils/bcrypt";

describe("Password utilities", () => {

  it("should hash a password", async () => {
    const password = "Password123";

    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toBeTypeOf("string");
  });

  it("should correctly compare password", async () => {
    const password = "Password123";

    const hash = await hashPassword(password);

    const result = await comparePassword(
      hash,
      password
    );

    expect(result).toBe(true);
  });

  it("should reject incorrect password", async () => {
    const password = "Password123";

    const hash = await hashPassword(password);

    const result = await comparePassword(
      hash,
      "WrongPassword"
    );

    expect(result).toBe(false);
  });

});