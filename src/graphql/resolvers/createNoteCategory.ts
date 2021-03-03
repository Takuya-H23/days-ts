import { pipe } from 'fp-ts'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'

export default async function createNoteCatogory(
  _,
  { input },
  { pool, cookies }
) {
  return { note_category_id: 1, category: 'test', created_at: 'test' }
}
