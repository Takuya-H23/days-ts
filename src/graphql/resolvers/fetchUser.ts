import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/function'
import {
  genServerError,
  getHeadFromRows,
  identity,
} from '../utils/functions/general'

const fetchUserQuery = 'SELECT * FROM users WHERE user_id = $1'
//@ts-ignore
export default async function fetchUser(_, __, { pool, userIdEither }) {
  const fetchUser = (id: string) => pool.query(fetchUserQuery, [id])

  const fetchUserTE = pipe(
    TE.fromEither(userIdEither),
    TE.chain(({ id }) => TE.tryCatch(() => fetchUser(id), genServerError))
  )

  console.log('run!!')
  return await fetchUserTE().then(E.fold(identity, getHeadFromRows))
}
