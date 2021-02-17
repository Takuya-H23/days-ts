import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInputs } from '../hooks'

const iv = {
  username: '',
  password: '',
  email: '',
}

const SignUp = () => {
  const { inputs, handleChange } = useInputs(iv)
  return (
    <Layout minHeight>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Sing up
      </Typography>
      <Form spacing={5}>
        <Field
          name="username"
          label="Username"
          onChange={handleChange}
          value={inputs.username}
        />
        <Field
          name="email"
          label="Email"
          onChange={handleChange}
          value={inputs.email}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="Password"
          onChange={handleChange}
          value={inputs.password}
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
