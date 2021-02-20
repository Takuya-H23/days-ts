import React from 'react'
import { Typography, Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { isEmpty, compose, prop, head } from 'ramda'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInput, useSignIn } from '../hooks'
import { ROUTES } from '../utils/constants'
import { validateInput } from '../utils/functions'

const iv = {
  email: '',
  password: '',
}

// {mutation.isError && mutation.error.response.errors[0].message}
const getErrorMessage = compose(
  prop('message'),
  head,
  prop('errors'),
  prop('response')
)

const SignIn = () => {
  const { input, handleChange } = useInput(iv)
  const [error, setError] = React.useState<{ [key: string]: string }>({})
  //@ts-ignore
  const mutation = useSignIn({ input })

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const res = validateInput(input)

    return isEmpty(res) ? (setError({}), mutation.mutate()) : setError(res)
  }

  React.useEffect(() => {
    let timer: any

    if (mutation.isError) {
      timer = setTimeout(() => {
        mutation.reset()
      }, 3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [mutation.isLoading])

  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sign in
      </Typography>
      <Snackbar
        open={mutation.isError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {/* @ts-ignore */}
          {mutation.isError && getErrorMessage(mutation.error)}
        </Alert>
      </Snackbar>
      <Form onSubmit={handleSubmit} submitText="Sign in" spacing={3}>
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
