import React from 'react'
import { compose, lensProp, over } from 'ramda'
import { request, gql } from 'graphql-request'
import { END_POINT } from '../utils/constants/routes'

interface InitialValues {
  [key: string]: any
}

type User = {
  [kye: string]: any
}

type State = {
  isLoggedIn: boolean
  isLoading: boolean
  user: User | null
}

type Action = { type: string; payload?: any }

const iv: InitialValues = {
  isLoggedIn: false,
  isLoading: false,
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

const fetchUser = () => request(END_POINT, query)

const L = {
  user: lensProp('user'),
  isLoading: lensProp('isLoading'),
  isLoggedIn: lensProp('isLoggedIn'),
}

const init = (state: State) => over(L.isLoading, () => true, state)

const updateUser = (state: State, payload: User) =>
  compose(
    over(L.isLoading, () => false),
    over(L.isLoggedIn, () => true),
    over(L.user, () => payload)
  )(state)

const actions: Record<string, any> = {
  init,
  updateUser,
}

const reducer = (state: any, { type, payload }: any) => {
  return actions[type](state, payload)
}

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, iv)

  React.useEffect(() => {
    dispatch({ type: 'init' })

    fetchUser()
      .then(d => dispatch({ type: 'updateUser', payload: d.fetchUser }))
      .catch(console.error)
  }, [])

  console.log(state)

  const value = {}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
