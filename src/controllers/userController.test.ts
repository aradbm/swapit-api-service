// src/controllers/userController.test.ts

import { Request, Response } from 'express';
import userController from './userController';
import UserModel from '../models/user';

jest.mock('../models/user');

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      params: { id: '123' },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.resetAllMocks();
  });


  it('should create a new user when user does not exist', async () => {
    const mockNewUser = { uid: '123', lastlogin: new Date() };
    (UserModel.getUserById as jest.Mock).mockResolvedValue(null);
    (UserModel.addUser as jest.Mock).mockResolvedValue(mockNewUser);

    await userController.getUser(mockRequest as Request, mockResponse as Response);

    expect(UserModel.getUserById).toHaveBeenCalledWith('123');
    expect(UserModel.addUser).toHaveBeenCalledWith('123');
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      user: mockNewUser,
      token: expect.any(String)
    }));
  });

});