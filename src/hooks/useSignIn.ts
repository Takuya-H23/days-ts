import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { ROUTES } from '../utils/constants'

interface SignInValues {
  email: string
  password: string
}

interface Input {
  input: SignInValues
}

const signInQuery = gql`
  mutation($input: SignInInput) {
    signIn(input: $input) {
      username
      email
      created_at
    }
  }
`
export default function useSignIn(input: Input) {
  return useMutation(
    'signIn',
    async () => await request(ROUTES.END_POINT, signInQuery, input)
  )
}
