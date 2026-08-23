import {
  describe,
  expect,
  it
} from "vitest";

import request from "supertest";
import app from "../../src/app.js";

describe("Authentication", () => {

  it("should register a user", async () => {
    const email =
      `test-${Date.now()}@example.com`;

    const response = await request(app)
      .post("/auth/register")
      .send({
        user: {
          name: "Test User",
          email,
          password: "Password123"
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should login and return cookies", async () => {
    const email =
      `login-${Date.now()}@example.com`;

    const password = "Password123";

    await request(app)
      .post("/auth/register")
      .send({
        user: {
          name: "Login User",
          email,
          password
        }
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        user: {
          email,
          password
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(
      response.headers["set-cookie"]
    ).toBeDefined();
  });

});