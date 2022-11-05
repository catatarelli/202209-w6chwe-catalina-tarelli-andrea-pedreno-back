import type { Response } from "express";
import Robot from "../../database/models/Robot.js";
import robotMock from "../../mocks/mocks.js";
import getRobots from "./robotControllers.js";

describe("Given a robotController", () => {
  describe("When getRobots it's called", () => {
    describe("And it receives a response", () => {
      test("Then it should call the response method status with a 200", async () => {
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        const expectedStatus = 200;

        Robot.find = jest.fn().mockReturnValue(robotMock);

        await getRobots(null, res as Response);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith({ robots: robotMock });
      });
    });
  });
});
