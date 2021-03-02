import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    hello: String!
  }

  type Mutation {
    signIn(input: SignInInput): User!
    signUp(input: SignUpInput): User!
    createNoteCategory(input: CreateNoteCategory): Category!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    created_at: String!
    last_login: String
  }

  type Category {
    note_category_id: ID!
    category: String!
    created_at: Stirng!
    updated_at: Stirng
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

  input CreateNoteCategory {
    category: String!
  }
`
