import { Request, Response } from "express";
import * as userController from "../../src/controllers/userController";
import { UserService } from "../../src/services/userService";

// Mock the userService
jest.mock("../../src/services/userService");

describe("UserController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });
    mockResponse = {
      status: responseStatus,
      json: responseJson,
    };
  });

  describe("createUser", () => {
    it("should create a user and return 201", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const mockUser = { ...userData, id: 1 };
      mockRequest.body = userData;
      (UserService.prototype.create as jest.Mock).mockResolvedValue(mockUser);

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("getUserById", () => {
    it("should return user by id with status 200", async () => {
      const mockUser = { id: 1, name: "John", email: "john@example.com" };
      mockRequest.params = { id: "1" };
      (UserService.prototype.getUser as jest.Mock).mockResolvedValue(mockUser);

      await userController.getUserById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("updateUser", () => {
    it("should update user successfully and return 204", async () => {
      const updateData = { name: "John Updated" };
      mockRequest = {
        params: { id: "1" },
        body: updateData,
      };
      (UserService.prototype.update as jest.Mock).mockResolvedValue(undefined);

      await userController.updateUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(204);
      expect(responseJson).toHaveBeenCalled();
    });
  });
});
