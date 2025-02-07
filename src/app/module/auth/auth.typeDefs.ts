export const RegisterUserTypeDefs = `#graphql

type Query {
    registerUsers: RegisterUser
  }

 
  type Mutation {
    registerUser(input: IRegisterUser): User
    login(input: ILogin): User
    refresh:User
  }

  type User{
    token: String!
  }

  input ILogin{
    email: String!
    password: String!
  }

  input IRegisterUser {
    name: String!
    email: String!
    password: String!
    role: TUserRole!
    contactNumber: String!
  }

  type RegisterUser {
    id: ID!
    name: String!
    email: String!
    contactNumber: String!
  }
   
 enum TUserRole {
    ADMIN
    WRITER
  }
  
`;
