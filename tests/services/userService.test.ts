import { UserService } from "../../src/services/userService";
import User from "../../src/models/user";
import { NotFoundError } from "../../src/models/exceptions";

// Mock the User model
jest.mock("../../src/models/user", () => ({
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;
  const excludingPassword = { exclude: ["password"] };

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a user successfully", async () => {
      const newUser = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const createdUser = { id: 1, ...newUser };
      (User.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await userService.create(newUser);

      expect(result).toEqual(createdUser);
      expect(User.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe("findById", () => {
    it("should return user by id without password", async () => {
      const mockUser = {
        id: 1,
        name: "John",
        email: "john@example.com",
      };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUser(1);

      expect(result).toEqual(mockUser);
      expect(User.findByPk).toHaveBeenCalledWith(1, excludingPassword);
    });

    it("should throw NotFoundError if user not found", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(userService.getUser(1)).rejects.toThrow(NotFoundError);
      expect(User.findByPk).toHaveBeenCalledWith(1, excludingPassword);
    });
  });
});
