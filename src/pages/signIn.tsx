import React from 'react'
import Link from 'next/link'
import { Box, Typography } from '@material-ui/core'
import { isEmpty } from 'ramda'
import { Layout } from '../components'
import { Field, Form, FormAlert } from '../elements'
import { useInput, useSignIn } from '../hooks'
import { validateInput } from '../utils/functions'
import { ROUTES } from '../utils/constants'
const {
  ROUTES: { SIGN_UP },
} = ROUTES

const iv = {
  email: '',
  password: '',
}

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
      }, 5000)
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
      <FormAlert isError={mutation.isError} error={mutation.error} />
      <Form onSubmit={handleSubmit} submitText="Sign in" spacing={3}>
        <Field
          name="email"
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
