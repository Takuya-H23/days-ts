import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe}  from 'fp-ts/function'
import { compose, head, isNil, prop } from 'ramda'
const signInQuery = 'SELECT * FROM users WHERE email = $1'


const id = (x: any): any => x

const genError = (e: any): any => new Error(String(Error))

//@ts-ignore
const signIn = async (_, { input }, { pool, cookies}) => {
  const getUser = () => pool.query(signInQuery, [input.email])

  const userTE = pipe(
    TE.tryCatch<Error, any>(getUser, genError),
    TE.map(compose(head, prop('rows'))),
    TE.chain(user => isNil(user) ? TE.left(new Error('User not found')) : TE.right(user)),
    TE.fold(T.of, T.of)
  )

  const res = await userTE()
  return res
  // return { username: 'test', 'email': 'test', 'created_at': 'now'}
}

export default signIn