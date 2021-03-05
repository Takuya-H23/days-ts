//@ts-nocheck
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { getHeadFromRows, genServerError, id } from '../utils/functions/general'

const createNoteCategoryQuery =
  'INSERT INTO note_categories (category, created_at) VALUES ($1, NOW()) RETURNING note_category_id, category, created_at'

export default async function createNoteCategory(
  _,
  { input },
  { pool, userIdEither }
) {
  const query = () => pool.query(createNoteCategoryQuery, [input.category])

  const test = pipe(
    TE.fromEither(userIdEither),
    TE.chain(() => TE.tryCatch(query, genServerError))
  )

  return await test().then(E.fold(id, getHeadFromRows))
}
