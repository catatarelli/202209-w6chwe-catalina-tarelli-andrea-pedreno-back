import type { Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError, notFoundPage } from "./errors";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given an errors middleware", () => {
  describe("And the function generalError", () => {
    describe("When it receives a response with customError and an status 500", () => {
      test("Then it should return the same status", () => {
        const error = new CustomError("", 500, "General Error");

        const expectedStatus = 500;

        generalError(error, null, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it receives a response with customError and a publicMessage 'General Error' ", () => {
      test("Then it should return the method json with the message received", () => {
        const error = new CustomError("", 300, "General Error");

        const expectedMessage = "General Error";

        generalError(error, null, res as Response, null);

        expect(res.json).toHaveBeenCalledWith(expectedMessage);
      });
    });

    describe("When it receives a response with customError and no status", () => {
      test("Then it should return the status 500", () => {
        const error = new Error("");

        const expectedStatus = 500;

        generalError(error as CustomError, null, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it receives a response and a customError with no message", () => {
      test("Then it should return the method json with the public message 'Ops, something went wrong, try again later'", () => {
        const error = new Error("");

        const expectedMessage = "Ops, something went wrong, try again later";

        generalError(error as CustomError, null, res as Response, null);

        expect(res.json).toHaveBeenCalledWith(expectedMessage);
      });
    });
  });

  describe("And the function notFoundPage", () => {
    describe("When it receives a response", () => {
      test("Then it should return the method status 404", () => {
        const expectedStatus = 404;

        notFoundPage(null, res as Response);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });

      test("Then it should return the method json with the message 'Page not found'", () => {
        const expectedMessage = { message: "Page not found" };

        res.json = jest.fn().mockReturnValue(expectedMessage);

        notFoundPage(null, res as Response);

        expect(res.json).toHaveBeenCalledWith(expectedMessage);
      });
    });
  });
});
