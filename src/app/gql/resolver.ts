import { loginResolver, registerResolver } from "../module/auth/auth.resolver";

export const resolvers = {
  Query: {},
  Mutation: {
    ...registerResolver,
    ...loginResolver,
  },
};
