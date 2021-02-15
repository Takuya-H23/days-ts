import React from 'react'
import { Layout } from '../src/components'
import { Field, Form } from '../src/elements'

const SignUp: React.FC = () => {
  const [inputs, setInputs] = React.useState('here')
  return (
    <Layout minHeight>
      <Form>
        <Field
          name="username"
          label="Username"
          onChange={e => setInputs(e.target.value)}
          value={inputs}
        />
      </Form>
    </Layout>
  )
}

export default SignUp
