import React from 'react'
import { useMutation } from 'react-query'
import { isEmpty } from 'ramda'
import { request, gql } from 'graphql-request'
import useInput from './useInput'
import { ROUTES } from '../utils/constants'
import { validateInput } from '../utils/functions'

const signInQuery = gql`
  mutation($input: SignInInput) {
    signIn(input: $input) {
      username
      email
      created_at
    }
  }
`
interface IV {
  [key: string]: any
}

interface Args {
  iv: IV
  id: string
  query: string
}

export default function useSignIn({ iv, id, query }: Args) {
  const { input, handleChange } = useInput(iv)
  const [error, setError] = React.useState<{ [key: string]: string }>({})

  const mutation = useMutation(
    id,
    async () => await request(ROUTES.END_POINT, query, { input })
  )

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

  return { input, error, mutation, handleChange, handleSubmit }
}
