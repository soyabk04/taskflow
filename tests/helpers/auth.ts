import request from "supertest";
import app from "../../src/app.js";

export const createAuthenticatedUser = async () => {
  const email = `test-${Date.now()}@example.com`;
  const password = "Password123";

  await request(app)
    .post("/auth/register")
    .send({
      user: {
        name: "Test User",
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

  if (response.status !== 200) {
    throw new Error(
      `Login failed: ${JSON.stringify(response.body)}`
    );
  }

  const cookies = response.headers["set-cookie"];

  if (!cookies) {
    throw new Error("Login did not return cookies");
  }

  return {
    email,
    password,
    cookies
  };
};