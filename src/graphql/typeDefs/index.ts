import { gql } from 'apollo-server-micro'

export default gql`
  type Query  {
    hello: String!
  }

  type Mutation {
    signIn(input: SignInInput): User!
    signUp(input: SignUpInput): User!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    created_at: String!
    last_login: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }
`
