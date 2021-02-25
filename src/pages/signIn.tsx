import React from 'react'
import Link from 'next/link'
import { gql } from 'graphql-request'
import { Box, Typography } from '@material-ui/core'
import { isEmpty } from 'ramda'
import { Layout } from '../components'
import { Field, Form, FormAlert } from '../elements'
import { useInput, useMutation, useSignIn } from '../hooks'
import { validateInput } from '../utils/functions'
import { ROUTES } from '../utils/constants'

const {
  ROUTES: { SIGN_UP },
} = ROUTES

const iv = {
  email: '',
  password: '',
}

const query = gql`
  mutation($input: SignInInput) {
    signIn(input: $input) {
      username
      email
      created_at
    }
  }
`

const SignIn = () => {
  const { input, error, mutation, handleChange, handleSubmit } = useMutation({
    iv,
    query,
    id: 'signIn',
  })

  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sign in
      </Typography>
      <FormAlert isError={mutation.isError} error={mutation.error} />
      <Form onSubmit={handleSubmit} submitText="Sign in" spacing={3}>
        <Field
          id="signInUsername"
          name="email"
          value={input.email}
          error={Boolean(error.email)}
          helperText={error.email || ' '}
          onChange={handleChange}
        />
        {/* @ts-ignore */}
        <Field.Password
          id="signInPassword"
          helperText="Password length must be 6 to 16"
          error={Boolean(error.password)}
          name="password"
          value={input.password}
          onChange={handleChange}
        />
      </Form>
      <Box mt={2}>
        <Typography variant="body1" color="textPrimary">
          Need an account?{' '}
          <Link href={SIGN_UP.URL}>
            <a>{SIGN_UP.LABEL}</a>
          </Link>
        </Typography>
      </Box>
    </Layout>
  )
}

export default SignIn
