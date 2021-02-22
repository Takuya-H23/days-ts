import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInput } from '../hooks'

const iv = {
  username: '',
  password: '',
  email: '',
}

const SignUp = () => {
  const { input, handleChange } = useInput(iv)
  const [error, setError] = React.useState<{ [key: string]: string }>({})

  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sing up
      </Typography>
      <Form onSubmit={e => {}} spacing={5}>
        <Field
          name="username"
          label="Username"
          onChange={handleChange}
          value={input.username}
          error={Boolean(error.username)}
        />
        <Field
          name="email"
          label="Email"
          onChange={handleChange}
          value={input.email}
          error={Boolean(error.email)}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="Password"
          onChange={handleChange}
          error={Boolean(error.password)}
          value={input.password}
          type="password"
        />
      </Form>
      <Box mt={3}>
        <Typography variant="body1" color="textPrimary">
          Already have an account? Login in from here
        </Typography>
      </Box>
    </Layout>
  )
}

export default SignUp
