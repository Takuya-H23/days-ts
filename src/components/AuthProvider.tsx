import React from 'react'
import { lensProp, over } from 'ramda'
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

// const useFetchUser = () => {
//   return useQuery('user', async () => request(END_POINT, query), {
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   })
// }

const fetchUser = () => request(END_POINT, query)

const L = {
  user: lensProp('user'),
  isLoading: lensProp('isLoading'),
}

const actions = {
  fetchUser,
}

const reducer = (state, { type, payload }) => {
  return actions[type](state, payload)
}

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, iv)

  React.useEffect(() => {
    fetchUser().then(d => dispatch({ type: 'fetchUser', payload: d.fetchUser }))
    //    fetchUser().then(console.log)
  }, [])
  console.log('state', state)

  const value = {}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
