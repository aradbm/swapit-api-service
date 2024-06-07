// tests/userController.test.js
const UserModel = require("../models/user");
const userController = require("../controllers/userController");
const { message } = require("statuses");

// Mock the UserModel methods
jest.mock("../models/user");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get an existing user", async () => {
    const mockUser = { uid: "123", lastlogin: new Date() };
    UserModel.getUserById.mockResolvedValue(mockUser);
    UserModel.updateUser.mockResolvedValue(mockUser);

    const req = { params: { id: "123" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await userController.getUser(req, res);

    expect(UserModel.getUserById).toHaveBeenCalledWith("123");
    expect(UserModel.updateUser).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith({
      user: mockUser,
      token: expect.any(String),
    });
  });

  it("should get an existing user", async () => {
    const mockUser = { uid: "123", lastlogin: new Date() };
    UserModel.getUserById.mockResolvedValue(mockUser);
    UserModel.updateUser.mockResolvedValue(mockUser);

    const req = { params: { id: "123" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await userController.getUser(req, res);

    expect(UserModel.getUserById).toHaveBeenCalledWith("123");
    expect(UserModel.updateUser).toHaveBeenCalledWith("123");
    expect(res.json).toHaveBeenCalledWith({
      user: mockUser,
      token: expect.any(String),
    });
  });
});
