import type, { NextApiRequest, NextApiResponse } from 'next'
import E as from 'fp-ts'
import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import Cookies from 'cookies'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'
import { AUTH  } from '../../utils/constants'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

interface NextApi  {
  req: NextApiRequest,
  res: NextApiResponse
}


const getCookies = (cookies) => cookies.get(AUTH.AUTH_COOKIE)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: NextApi) => {
    return {
      cookies: new Cookies(req, res),
      pool
    }
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default handler
