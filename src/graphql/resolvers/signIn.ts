import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe}  from 'fp-ts/function'
import { compose, head, isNil, prop } from 'ramda'
import jwt from 'jsonwebtoken'
const signInQuery = 'SELECT * FROM users WHERE email = $1'
// @ts-ignore
const genToken = (id: string): string => jwt.sign({ id }, process.env.JWT_SECRET)


const id = (x: any): any => x

const genError = (e: any): any => new Error(String(Error))

interface User {
  user_id: any
  username: string
  email: string
  created_at: string
  last_login: string | null
}

//@ts-ignore
const signIn = async (_, { input }, { pool, cookies}) => {
  const getUser = () => pool.query(signInQuery, [input.email])


  const userTE = pipe(
    TE.tryCatch<Error, any>(getUser, genError),
    TE.map(compose(head, prop('rows'))),
    TE.chain(user => isNil(user) ? TE.left(new Error('User not found')) :TE.right(user)),
    TE.map(user => ({ token: genToken(user.user_id), user})),
    TE.chain(({ user, token }) => (setAuthCookie(token),TE.right(user))), 
    TE.fold(T.of, T.of)
  )

  const cookieConfig = {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

  const setAuthCookie = (token: string) => cookies.set('auth-cookie', token, cookieConfig)

  const res = userTE()
  return res
  //@ts-ignore
  // return { username: 'test', 'email': 'test', 'created_at': 'now'}
}

export default signIn