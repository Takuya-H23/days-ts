//@ts-nocheck
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { compose, prop } from 'ramda'
import {
  getHeadFromRows,
  genServerError,
  identity,
} from '../utils/functions/general'

const isZero = x => Number(x) === 0
const shouldInsert = compose(isZero, prop('count'), getHeadFromRows)

const createNoteCategoryQuery =
  'INSERT INTO note_categories (user_id, note_category, created_at) VALUES ($1, $2, NOW()) RETURNING *'

const checkDuplicates =
  'SELECT count(note_category) FROM note_categories WHERE user_id = $1 AND note_category = $2'

export default async function createNoteCategory(
  _,
  { input },
  { pool, userIdEither }
) {
  const insertQuery = id =>
    pool.query(createNoteCategoryQuery, [id, input.noteCategory])

  const checkDuplicateQuery = id =>
    pool.query(checkDuplicates, [id, input.noteCategory])

  const checkNoteCategoryDuplicates = pipe(
    TE.fromEither(userIdEither),
    TE.chain(({ id }) =>
      pipe(
        TE.tryCatch(() => checkDuplicateQuery(id), genServerError),
        TE.chain(res =>
          shouldInsert(res)
            ? TE.tryCatch(() => insertQuery(id), genServerError)
            : TE.left(new Error('Category already exists'))
        )
      )
    )
  )

  return await checkNoteCategoryDuplicates().then(
    E.fold(identity, getHeadFromRows)
  )
}
