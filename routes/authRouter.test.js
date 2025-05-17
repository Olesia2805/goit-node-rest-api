import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";

describe("test /api/auth/login", () => {
  let server;

  beforeAll(async () => {
    server = app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "example@gmail.com",
      password: "your_test_password",
    };

    const { status, body } = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    expect(status).toBe(200);

    expect(body).toHaveProperty("token");
    const decodedToken = jwt.verify(body.token, process.env.JWT_SECRET);
    expect(decodedToken).toHaveProperty("email", loginData.email);
    expect(decodedToken).toHaveProperty("exp");
    expect(decodedToken).toHaveProperty("iat");

    expect(typeof body.user.subscription).toBe("string");
    expect(body.user).toEqual({
      email: loginData.email,
      subscription: "starter",
    });
  });
});
