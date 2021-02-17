import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import Cookies from 'cookies'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

interface NextApi  {
  req: NextApiRequest,
  res: NextApiResponse
}

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
