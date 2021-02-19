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
        />
        <Field
          name="email"
          label="Email"
          onChange={handleChange}
          value={input.email}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="Password"
          onChange={handleChange}
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
