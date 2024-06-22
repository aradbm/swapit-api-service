"use strict";
// src/controllers/userController.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("./userController"));
const user_1 = __importDefault(require("../models/user"));
jest.mock('../models/user');
describe('User Controller', () => {
    let mockRequest;
    let mockResponse;
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
    it('should create a new user when user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockNewUser = { uid: '123', lastlogin: new Date() };
        user_1.default.getUserById.mockResolvedValue(null);
        user_1.default.addUser.mockResolvedValue(mockNewUser);
        yield userController_1.default.getUser(mockRequest, mockResponse);
        expect(user_1.default.getUserById).toHaveBeenCalledWith('123');
        expect(user_1.default.addUser).toHaveBeenCalledWith('123');
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            user: mockNewUser,
            token: expect.any(String)
        }));
    }));
});
