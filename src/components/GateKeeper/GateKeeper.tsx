import React from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../AuthProvider'

type Props = {
  children: React.ReactChildren
}

export default function GateKeeper({ children }: Props) {
  const { route, push } = useRouter()
  const { state } = React.useContext(AuthContext)

  if (!route.includes('/dashboard') || state.isLoggedIn) return children

  if (state.isLoading) return <div>Loading...</div>

  if (!state.isLoggedIn) {
    push('/signIn')
    return null
  }

  return children
}
