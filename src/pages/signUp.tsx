import React from 'react'
import Link from 'next/link'
import { isEmpty } from 'ramda'
import { Box, Typography } from '@material-ui/core'
import { Layout } from '../components'
import { Field, Form, FormAlert } from '../elements'
import { useInput, useSignUp } from '../hooks'
import { validateInput } from '../utils/functions'
import { ROUTES } from '../utils/constants'
const {
  ROUTES: { SIGN_IN },
} = ROUTES

const iv = {
  username: '',
  password: '',
  email: '',
}

const SignUp = () => {
  const { input, handleChange } = useInput(iv)
  const [error, setError] = React.useState<{ [key: string]: string }>({})
  //@ts-ignore
  const mutation = useSignUp({ input })

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
        Sing up
      </Typography>
      <FormAlert isError={mutation.isError} error={mutation.error} />
      <Form onSubmit={handleSubmit} spacing={3}>
        <Field
          name="username"
          label="Username"
          onChange={handleChange}
          value={input.username}
          error={Boolean(error.username)}
          helperText={error.username || ' '}
        />
        <Field
          name="email"
          label="Email"
          onChange={handleChange}
          value={input.email}
          error={Boolean(error.email)}
          helperText={error.email || ' '}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="Password"
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

export default SignUp
