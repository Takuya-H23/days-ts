import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { DashboardLayout } from '../../components'
import { END_POINT } from '../../utils/constants/routes'

const query = gql`
  query {
    hello
  }
`

const useHello = () =>
  useQuery(['hello'], async () => await request(END_POINT, query))

export default function Dashboard() {
  return <DashboardLayout>content will be here</DashboardLayout>
}
