import { ZodError } from "zod";

export function validateBody(schema) {
  return (req, _res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next({
          status: 400,
          message: "Invalid request payload",
          details: err.flatten()
        });
      }
      return next(err);
    }
  };
}
