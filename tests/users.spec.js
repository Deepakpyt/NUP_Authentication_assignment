const request = require("supertest");
const app = require("../app");

const mongoose = require("mongoose");
const User = require("../model/User");
const dotenv = require("dotenv");

beforeAll(async () => {
  dotenv.config();
  // Connect to a test database before running tests
  await mongoose.connect(
    `${process.env.MONGO_DATABASE}/test-express-mongoose-api`
  );
});

afterAll(async () => {
  // Clear the User collection before each test
  await User.deleteMany();
  // Disconnect from the test database after all tests are done
  await mongoose.disconnect();
});

describe("User Routes", () => {
  // Mock user data for testing
  const userData = {
    firstname: "testuser",
    lastname: "testing",
    email: "test@gmail.com",
    password: "Testpassword12",
  };

  const logInData = {
    email: "test@gmail.com",
    password: "Testpassword12",
  };

  let authToken; // To store the authentication token for future requests

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty("createdAt");
  });

  // Test user login
  it("should login with the registered user", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(logInData)
      .expect(200);

    expect(response.body).toHaveProperty("token");
    authToken = response.body.token; // Save the token for future requests
  });

  // Test user profile retrieval
  it("should get the user profile with the valid token", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      `Welcome to your profile ${userData.firstname} ${userData.lastname} !!!`
    );
  });

  // Test user profile retrieval without authentication token
  it("should return unauthorized without a token", async () => {
    await request(app).get("/users/profile").expect(401);
  });
});
