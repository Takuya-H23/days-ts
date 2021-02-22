import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { ROUTES } from '../utils/constants'

interface SignUpValues {
  username: string
  email: string
  password: string
}

interface Input {
  input: SignUpValues
}

const signUpQuery = gql`
  mutation($input: SignUpInput) {
    signUp(input: $input) {
      username
      email
      created_at
    }
  }
`
export default function useSignIn(input: Input) {
  return useMutation(
    'signIn',
    async () => await request(ROUTES.END_POINT, signUpQuery, input)
  )
}
