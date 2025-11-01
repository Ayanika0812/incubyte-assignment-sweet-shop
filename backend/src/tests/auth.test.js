const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll(async () => {
  await User.deleteMany({});
});


describe("Auth Tests", () => {
  test("User registration should return token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });
});


test("User login should return token", async () => {
  // First register a user
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Login User",
      email: "login@example.com",
      password: "123456"
    });

  // Now try login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "login@example.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});
