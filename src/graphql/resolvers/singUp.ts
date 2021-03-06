//@ts-nocheck
import { hash } from 'bcryptjs'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/function'
import { general, users } from '../utils/functions'
import { userTypes as U } from '../../utils/types'

const signUpQuery =
  'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING user_id, username, email, created_at'

export default async function signUp(
  _,
  { input },
  { pool, cookies, userEither }
) {
  const hashed = await hash(input.password, 10)

  const insertUser = () =>
    pool.query(signUpQuery, [input.username, input.email, hashed])

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
      general.identity,
      ({ user, token }) => (users.setAuthCookie(cookies)(token), user)
    )
  )
}
