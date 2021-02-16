import React from 'react'
import { Layout } from '../src/components'
import { Field, Form } from '../src/elements'

const SignUp: React.FC = () => {
  const [inputs, setInputs] = React.useState({
    username: '',
    password: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(cur => ({
      ...cur,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Layout minHeight>
      <Form>
        <Field
          name="username"
          label="Username"
          onChange={onChange}
          value={inputs.username}
        />
        {/* @ts-ignore */}
        <Field.Password
          name="password"
          label="Password"
          onChange={onChange}
          value={inputs.password}
          type="password"
        />
      </Form>
    </Layout>
  )
}

export default SignUp
