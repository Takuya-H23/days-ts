import { Typography } from '@material-ui/core'
import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInput } from '../hooks'

const iv = {
  email: '',
  password: '',
}

const END_POINT = '/api/graphql'

const signInQuery = gql`
  mutation($input: SignInInput) {
    signIn(input: $input) {
      username
      email
      created_at
    }
  }
`

const useSignIn = (vars: { input: { email: string; password: string } }) =>
  useMutation('signIn', async () => await request(END_POINT, signInQuery, vars))

const SignIn = () => {
  const { input, handleChange } = useInput(iv)
  //@ts-ignore
  const mutation = useSignIn({ input })

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    return mutation.mutate()
  }
  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sign in
      </Typography>
      <Form spacing={5}>
        <Field
          name="email"
          label="email"
          value={input.email}
          onChange={handleChange}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="password"
          value={input.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </Form>
    </Layout>
  )
}

export default SignIn
