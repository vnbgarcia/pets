import request from "supertest";
import { app } from "../../src/index";
import sequelize from "../../src/config/database";
import User from "../../src/models/user";

describe("User API Integration Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should not create user with duplicate email", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      await User.create(userData);

      await request(app).post("/api/users").send(userData).expect(400);
    });
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const users = [
        { name: "John", email: "john@example.com", password: "pass123" },
        { name: "Jane", email: "jane@example.com", password: "pass123" },
      ];

      await User.bulkCreate(users);

      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).not.toHaveProperty("password");
      expect(response.body[1]).not.toHaveProperty("password");
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by id", async () => {
      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "pass123",
      });

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200);

      expect(response.body.name).toBe("John");
      expect(response.body.email).toBe("john@example.com");
      expect(response.body).not.toHaveProperty("password");
    });

    it("should return 404 for non-existent user", async () => {
      await request(app).get("/api/users/999").expect(404);
    });
  });

  describe("PATCH /api/users/:id", () => {
    it("should update user", async () => {
      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "pass123",
      });

      const response = await request(app)
        .patch(`/api/users/${user.id}`)
        .send({ name: "John Updated" })
        .expect(200);

      expect(response.body.name).toBe("John Updated");
      expect(response.body.email).toBe("john@example.com");
    });

    it("should not update to existing email", async () => {
      await User.create({
        name: "Jane",
        email: "jane@example.com",
        password: "pass123",
      });

      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "pass123",
      });

      await request(app)
        .patch(`/api/users/${user.id}`)
        .send({ email: "jane@example.com" })
        .expect(400);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user", async () => {
      const user = await User.create({
        name: "John",
        email: "john@example.com",
        password: "pass123",
      });

      await request(app).delete(`/api/users/${user.id}`).expect(204);

      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).toBeNull();
    });

    it("should return 404 for non-existent user", async () => {
      await request(app).delete("/api/users/999").expect(404);
    });
  });
});
