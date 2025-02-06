import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ZodError } from "zod";
import { Error } from "mongoose";

const { ValidationError } = Error;

const globalErrorHandler = (error: GraphQLError): GraphQLFormattedError => {
  // Extract custom properties
  const code = error.extensions?.code || "INTERNAL_SERVER_ERROR";
  const originalError = error.originalError;

  // Handle Zod validation errors
  if (code === "BAD_REQUEST" && originalError instanceof ZodError) {
    return {
      message: "Validation Error",
      extensions: {
        code,
        validationErrors: originalError.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
    };
  }

  // Handle Mongoose validation errors
  if (originalError instanceof ValidationError) {
    return {
      message: "Validation Error",
      extensions: {
        code: "BAD_REQUEST",
        validationErrors: Object.values(originalError.errors).map((err) => ({
          path: err.path,
          message: err.message,
        })),
      },
    };
  }

  // Generic error formatting
  return {
    message: error.message || "An unknown error occurred",
    extensions: {
      code,
      ...error.extensions,
    },
  };
};

export default globalErrorHandler;
