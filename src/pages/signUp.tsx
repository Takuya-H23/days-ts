import React from 'react'
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
    </Layout>
  )
}

export default SignUp
