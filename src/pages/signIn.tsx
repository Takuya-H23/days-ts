import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { isEmpty } from 'ramda'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInput } from '../hooks'
import { ROUTES } from '../utils/constants'
import { validateInput } from '../utils/functions'
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

const iv = {
  email: '',
  password: '',
}

const useSignIn = (input: Input) =>
  useMutation(
    'signIn',
    async () => await request(ROUTES.END_POINT, signInQuery, input)
  )

const SignIn = () => {
  const { input, handleChange } = useInput(iv)
  const [error, setError] = React.useState<{ [key: string]: string }>({})
  //@ts-ignore
  const mutation = useSignIn({ input })

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = validateInput(input)

    return isEmpty(res) ? mutation.mutate() : setError(res)
  }
  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sign in
      </Typography>
      <Form onSubmit={handleSubmit} submitText="Sign in" spacing={5}>
        <Field
          name="email"
          label="email"
          value={input.email}
          error={Boolean(error.email)}
          helperText={error.email || ' '}
          onChange={handleChange}
        />
        {/* @ts-ignore */}
        <Field.Password
          helperText="Password length must be 6 to 16"
          error={Boolean(error.password)}
          name="password"
          label="password"
          value={input.password}
          onChange={handleChange}
        />
      </Form>
    </Layout>
  )
}

export default SignIn
