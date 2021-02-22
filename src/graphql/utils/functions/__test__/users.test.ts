import { checkUserExists } from '../users'
import * as TE from 'fp-ts/TaskEither'

test('should return left is user not exists', async () => {
  //@ts-ignore
  const res = await checkUserExists()()
  expect(res._tag).toBe('Left')
})

test('should return right is user exists', async () => {
  //@ts-ignore
  const res = await checkUserExists({ username: 'foobar' })()
  expect(res._tag).toBe('Right')
})
