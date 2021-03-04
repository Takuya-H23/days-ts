import type, { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import Cookies from 'cookies'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'
import { getUser } from '../../graphql/utils/functions/users'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
})

interface NextApi {
  req: NextApiRequest
  res: NextApiResponse
}

// @ts-ignore
const verifyToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET)

export const getUserIdEither = flow(
  getUser,
  E.chain((token: string) =>
    E.tryCatch(
      () => verifyToken(token),
      e => e
    )
  )
)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: NextApi) => {
    const cookies = new Cookies(req, res)

    return {
      cookies,
      pool,
      userEither: getUserIdEither(cookies),
    }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default handler
