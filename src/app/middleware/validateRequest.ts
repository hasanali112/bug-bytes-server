import { GraphQLError } from "graphql";
import { AnyZodObject, ZodError } from "zod";

const ValidateRequest = async (schema: AnyZodObject, input: any) => {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new GraphQLError(error.issues[0].message, {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }
  }
};

export default ValidateRequest;
