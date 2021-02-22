// @ts-nocheck
import { checkUserExists, extractUser } from '../users'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'

test('should return left is user not exists', async () => {
  const res = await checkUserExists()()
  expect(res._tag).toBe('Left')
})

test('should return right is user exists', async () => {
  const res = await checkUserExists({ username: 'foobar' })()
  expect(res._tag).toBe('Right')
})

test('should return server error', async () => {
  const res: any = await pipe(
    extractUser(() => new Promise((_, reject) => reject('rejected'))),
    TE.fold(T.of, T.of)
  )()

  expect(res.message).toBe('Sorry something went wrong. Please try it later')
})

test('should return server error', async () => {
  const res: any = await pipe(
    extractUser(() => new Promise(resolve => resolve({ rows: ['success'] }))),
    TE.fold(T.of, T.of)
  )()

  expect(res).toBe('success')
})
