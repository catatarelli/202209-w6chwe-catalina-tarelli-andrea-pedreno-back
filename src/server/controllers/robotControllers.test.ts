import type { Response, NextFunction, Request } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";
import { robotsMock, robotMock } from "../../mocks/mocks.js";
import { getRobots, deleteRobotById } from "./robotControllers.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getRobots Controller", () => {
  describe("When it finds a list of robots", () => {
    test("Then it should call the response method status with a 200, and the json method", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn().mockReturnValue(robotsMock);

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an empty array", () => {
    test("Then it should call the response method status with a 404", async () => {
      const expectedStatus = 404;

      Robot.find = jest.fn().mockReturnValue([]);

      await getRobots(null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a response with an error", () => {
    test("Then next should be called", async () => {
      const customError = new CustomError("", 500, "General error");

      Robot.find = jest.fn().mockRejectedValue(Error(""));

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("When deleteRobotById is invoked", () => {
  describe("And it receives a response with an id to remove", () => {
    test("Then it should return status 200 and the id requested", async () => {
      const expectedStatus = 200;
      const idToDelete = { robotId: robotMock.id };

      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: "abracadabra" },
      };

      Robot.findById = jest.fn().mockReturnValue(robotMock);
      Robot.findByIdAndDelete = jest.fn().mockReturnThis();

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(idToDelete);
    });
  });

  describe("And it receives a response with a wrong token", () => {
    test("Then it should return status 498", async () => {
      const wrongToken = "pepinillo";
      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: wrongToken },
      };

      const customError = new CustomError(
        `The token (${wrongToken}) provided is not valid`,
        498,
        "Token expired or invalid. Try with another one."
      );

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("And it receives a response with a wrong id", () => {
    test("Then it should return status 404", async () => {
      const wrongId = "452242g2dssee515";
      const req: Partial<Request> = {
        params: { robotId: wrongId },
        query: { token: "abracadabra" },
      };

      const customError = new CustomError(
        `The id (${wrongId}) provided is not valid`,
        404,
        "Invalid id. Try with another one."
      );

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("And it receives a response with an id that doesn't exist", () => {
    test("Then it should return status 404", async () => {
      const nonexistentId = "6367bbebd9083fc661ea9ee0";
      const req: Partial<Request> = {
        params: { robotId: nonexistentId },
        query: { token: "abracadabra" },
      };

      Robot.findById = jest.fn().mockReturnValue(null);

      const customError = new CustomError(
        `The robot searched by the id (${nonexistentId}) doesn't exist`,
        404,
        "Sorry, no robot found with that id."
      );

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("And it is rejected", () => {
    test("Then it should return a general error", async () => {
      const customError = new CustomError("", 500, "General error");

      Robot.findById = jest.fn().mockRejectedValue(Error(""));

      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: "abracadabra" },
      };

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
