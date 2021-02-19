import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/function'
import { users } from '../utils'
const signInQuery = 'SELECT * FROM users WHERE email = $1'

interface User {
  user_id: string
  username: string
  created_at: string
  last_login?: string | null
}

type token = string

interface Payload {
  user: User,
  token: token
}

const id = (x:any): any => x 

//@ts-ignore
const signIn = async (_, { input }, { pool, cookies}) => {
  const getUser = () => pool.query(signInQuery, [input.email])

  const signInUser = pipe(
    users.extractUser(getUser), 
    TE.map((user: User): Payload => ({ user, token: users.genToken(process.env.JWT_SECRET, user.user_id)})),
  )

  return await signInUser()
    .then(E.fold(
      id, 
      ({ user, token}) => (users.setAuthCookie(cookies)(token)(), user) 
    ))
}

export default signIn