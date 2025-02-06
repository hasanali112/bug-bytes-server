import { GraphQLError } from "graphql";

export class ApiError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }
}
