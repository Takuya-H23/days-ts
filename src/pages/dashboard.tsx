import Link from 'next/link'
import { Typography } from '@material-ui/core'
import { DashboardLayout } from '../components'
import { Dashboard as DashboardIcon } from '@material-ui/icons'

export default function Dashboard() {
  return (
    <DashboardLayout
      left={
        <Typography variant="body1" color="textPrimary">
          <ul>
            <li>
              <Link href="/signUp">
                <a>
                  <DashboardIcon />
                  Dashboard
                </a>
              </Link>
            </li>
          </ul>
        </Typography>
      }
      right={
        <Typography variant="body1" color="textPrimary">
          content
        </Typography>
      }
    />
  )
}
