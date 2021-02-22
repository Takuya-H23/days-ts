import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/function'
import { users } from '../utils/functions'
import { userTypes as U } from '../../utils/types'

const signUpQuery =
  'INSERT INTO users (username, email, password, create_at) VALUES ($1, $2, $3, NOW())'

const id = (x: any): any => x

// @ts-ignore
export default async function signUp(_, { input }, { pool, cookies }) {
  const insertUser = () =>
    pool.query(signUpQuery, [input.username, input.email.input.password])

  const signUpUser = pipe(
    users.extractUser(insertUser),
    TE.map(
      (user: U.User): U.UserPayload => ({
        user,
        token: users.genToken(process.env.JWT_SECRET, user.user_id),
      })
    )
  )

  return await signUpUser().then(
    E.fold(
      id,
      ({ user, token }) => (users.setAuthCookie(cookies)(token)(), user)
    )
  )
}
