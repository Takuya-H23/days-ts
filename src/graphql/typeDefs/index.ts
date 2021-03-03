import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    hello: String!
  }

  type Mutation {
    signIn(input: SignInInput): User!
    signUp(input: SignUpInput): User!
    createNoteCategory(input: CreateNoteCategoryInput): Category!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    created_at: String!
    last_login: String
  }

  type Category {
    user_id: ID!
    note_category_id: ID!
    category: String!
    created_at: String!
    updated_at: String
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

  input CreateNoteCategoryInput {
    category: String!
  }
`
