// Never make a an API without a validation middleware/input validator! It's like making a database without a schema.
import express from "express";
import { z } from "zod";

const app = express();

export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          error: "validation error",
          details: e.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.params);

      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          error: "validation params error",
          details: e.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.query);

      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid query parameters",
          details: e.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(e);
    }
  };
};
