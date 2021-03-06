import { compose, head, prop } from 'ramda'

export const identity = (x: any): any => x

export const genServerError = (err: Error) =>
  //@ts-ignore
  new Error(err.detail || 'Sorry something went wrong. Please try it later')

export const getHeadFromRows = compose(head, prop('rows'))
