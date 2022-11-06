import type { Response, NextFunction, Request } from "express";
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

const next = jest.fn();

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
      Robot.find = jest.fn().mockRejectedValue(new Error(""));

      await getRobots(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
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
      Robot.findByIdAndDelete = jest.fn().mockReturnValue(robotMock);

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(idToDelete);
    });
  });

  describe("And it receives a response with a wrong tokken", () => {
    test("Then it should return status 498", async () => {
      const expectedStatus = 498;

      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: "pepinillo" },
      };

      Robot.findById = jest.fn();
      Robot.findByIdAndDelete = jest.fn();

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("And it receives a response with an empty param", () => {
    test("Then it should return status 404", async () => {
      const expectedStatus = 404;
      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: "abracadabra" },
      };

      Robot.findById = jest.fn();
      Robot.findByIdAndDelete = jest.fn();

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("And it is rejected", () => {
    test("Then it should return an error", async () => {
      const req: Partial<Request> = {
        params: { robotId: robotMock.id },
        query: { token: "abracadabra" },
      };

      Robot.findById = jest.fn().mockRejectedValueOnce(new Error(""));

      await deleteRobotById(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalled();
    });
  });
});
