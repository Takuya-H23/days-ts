import List from '@material-ui/core/List'
import { Typography } from '@material-ui/core'
import { DashboardLayout, IconNav } from '../components'
import DashboardIcon from '@material-ui/icons/Dashboard'

export default function Dashboard() {
  return (
    <DashboardLayout
      left={
        <List component="nav" aria-label="main mailbox folders">
          <IconNav Icon={<DashboardIcon />} text="Dashboard" />
        </List>
      }
      right={
        <Typography variant="body1" color="textPrimary">
          content
        </Typography>
      }
    />
  )
}
