import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/function'
import { users } from '../utils/functions'
import { userTypes as U } from '../../utils/types'

const signInQuery = 'SELECT * FROM users WHERE email = $1'

const id = (x: any): any => x

//@ts-ignore
const signIn = async (_, { input }, { pool, cookies }) => {
  const getUser = () => pool.query(signInQuery, [input.email])

  const signInUser = pipe(
    users.extractUser(getUser),
    TE.map(
      (user: U.User): U.UserPayload => ({
        user,
        token: users.genToken(process.env.JWT_SECRET, user.user_id),
      })
    )
  )

  return await signInUser().then(
    E.fold(
      id,
      ({ user, token }) => (users.setAuthCookie(cookies)(token)(), user)
    )
  )
}

export default signIn
