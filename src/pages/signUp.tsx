import React from 'react'
import { Layout } from '../components'
import { Field, Form } from '../elements'
import { useInputs } from '../hooks'

const iv = {
  username: '',
  password: '',
}

const SignUp: React.FC = () => {
  const { inputs, handleChange } = useInputs(iv)
  return (
    <Layout minHeight>
      <Form>
        <Field
          name="username"
          label="Username"
          onChange={handleChange}
          value={inputs.username}
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
