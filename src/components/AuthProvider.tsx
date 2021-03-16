import React from 'react'
import { useRouter } from 'next/router'
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

export const AuthContext = React.createContext(iv)

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

const returnFalse = (): boolean => false
const returnTrue = (): boolean => true

const updateUserSuccess = (state: State, payload: User) =>
  compose(
    over(L.isLoading, returnFalse),
    over(L.isLoggedIn, returnTrue),
    over(L.user, () => payload)
  )(state)

const actions: Record<string, any> = {
  init,
  updateUserSuccess,
}

const reducer = (state: any, { type, payload }: any) =>
  actions[type](state, payload)

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, iv)
  const { route, push } = useRouter()

  React.useEffect(() => {
    dispatch({ type: 'init' })

    fetchUser()
      .then(d => dispatch({ type: 'updateUserSuccess', payload: d.fetchUser }))
      .catch(console.error)
  }, [])

  const value = { state }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
