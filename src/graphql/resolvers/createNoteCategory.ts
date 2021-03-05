//@ts-nocheck
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { compose, prop } from 'ramda'
import { getHeadFromRows, genServerError, id } from '../utils/functions/general'

const checkCount = compose(porp('count'), getHeadFromRows)

const createNoteCategoryQuery =
  'INSERT INTO note_categories (user_id, category,created_at) VALUES ($1, $2, NOW()) RETURNING *'

const checkDuplicates =
  'SELECT count(category) FROM note_categories WHERE user_id = $1 AND category = $2'

export default async function createNoteCategory(
  _,
  { input },
  { pool, userIdEither }
) {
  const query = id => pool.query(createNoteCategoryQuery, [id, input.category])
  const checkQuery = id => pool.query(checkDuplicates, [id, input.category])

  const checkNoteCategoryDuplicates = pipe(
    TE.fromEither(userIdEither),
    TE.chain(({ id }) => TE.tryCatch(() => checkQuery(id), genServerError))
  )

  const res = await checkNoteCategoryDuplicates().then(
    E.fold(genSErverError, x => x.rows)
  )
  console.log(res)

  const insertNoteCategory = pipe(
    TE.fromEither(userIdEither),
    TE.chain(({ id }) => TE.tryCatch(() => query(id), genServerError))
  )

  return await insertNoteCategory().then(E.fold(id, getHeadFromRows))
}
