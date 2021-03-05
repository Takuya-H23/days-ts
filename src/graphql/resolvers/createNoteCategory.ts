//@ts-nocheck
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getHeadFromRows, genServerError, id } from '../utils/functions/general'

const createNoteCategoryQuery =
  'INSERT INTO note_categories (user_id, category,created_at) VALUES ($1, $2, NOW()) RETURNING *'

export default async function createNoteCategory(
  _,
  { input },
  { pool, userIdEither }
) {
  const query = id => pool.query(createNoteCategoryQuery, [id, input.category])

  const test = pipe(
    TE.fromEither(userIdEither),
    TE.chain(({ id }) => TE.tryCatch(() => query(id), genServerError))
  )

  return await test().then(E.fold(id, getHeadFromRows))
}
