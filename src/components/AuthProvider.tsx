import React from 'react'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { END_POINT } from '../utils/constants/routes'

interface InitialValues {
  [key: string]: any
}

const iv: InitialValues = {
  isLoggedIn: false,
  user: null,
}

type Props = {
  children: React.ReactNode
}

const AuthContext = React.createContext(iv)

const query = gql`
  query {
    fetchUser {
      username
      email
    }
  }
`

const useFetchUser = () => {
  return useQuery(
    'user',
    async () => {
      const data = request(END_POINT, query)
      return data
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )
}

export default function AuthProvider({ children }: Props) {
  const data = useFetchUser()
  console.log(data)
  const value = {}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
