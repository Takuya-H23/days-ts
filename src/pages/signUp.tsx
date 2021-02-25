import React from 'react'
import Link from 'next/link'
import { gql } from 'graphql-request'
import { Box, Typography } from '@material-ui/core'
import { Layout } from '../components'
import { Field, Form, FormAlert, LinearProgress } from '../elements'
import { useMutation } from '../hooks'
import { ROUTES } from '../utils/constants'

const {
  ROUTES: { SIGN_IN },
} = ROUTES

const iv = {
  username: '',
  password: '',
  email: '',
}

const query = gql`
  mutation($input: SignUpInput) {
    signUp(input: $input) {
      username
      email
      created_at
    }
  }
`

export default function SignUp() {
  const { input, error, mutation, handleChange, handleSubmit } = useMutation({
    iv,
    query,
    id: 'signUp',
  })

  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sing up
      </Typography>
      <LinearProgress isLoading={mutation.isLoading} />
      <FormAlert isError={mutation.isError} error={mutation.error} />
      <Form onSubmit={handleSubmit} spacing={3}>
        <Field
          id="signUpUsername"
          name="username"
          onChange={handleChange}
          value={input.username}
          error={Boolean(error.username)}
          helperText={error.username || ' '}
        />
        <Field
          id="signUpEmail"
          name="email"
          onChange={handleChange}
          value={input.email}
          error={Boolean(error.email)}
          helperText={error.email || ' '}
        />
        {/* @ts-ignore */}
        <Field.Password
          id="signUpPassword"
          name="password"
          onChange={handleChange}
          error={Boolean(error.password)}
          value={input.password}
          helperText={'Password length must be 6 to 16'}
          type="password"
        />
      </Form>
      <Box mt={3}>
        <Typography variant="body1" color="textPrimary">
          Already have an account?{' '}
          <Link href={SIGN_IN.URL}>
            <a>{SIGN_IN.LABEL}</a>
          </Link>{' '}
          from here
        </Typography>
      </Box>
    </Layout>
  )
}
