import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { flow, pipe}  from 'fp-ts/function'
import { compose, head, isEmpty, isNil, prop } from 'ramda'
const signInQuery = 'SELECT * FROM users WHERE email = $1'


const id = (x: any) => x

//@ts-ignore
const signIn = async (_, { input }, { pool, cookies}) => {
  const getUser = () => pool.query(signInQuery, [input.email])

// const userTE = flow(
//   TE.fold(id, id),
//   //@ts-ignore
//   TE.map(compose(head, prop('rows'))),
//   TE.map(x => (console.log('map', x), x)),
//   TE.tryCatch<Error, any>(
//   getUser,
//   (e: any) => new Error(e) 
// ))
const userTE = pipe(
  TE.tryCatch<Error, any>(
  getUser,
  (e: any) => new Error(e)),
  TE.map(compose(head, prop('rows'))),
  //@ts-ignore
  TE.fold(E.left, x => isNil(x) ? E.left(x) : E.right(x))
)
//@ts-ignore
const res = await userTE()
//@ts-ignore
console.log('here')
console.log(res)
  return { username: 'test', 'email': 'test', 'created_at': 'now'}
}

export default signIn