import { Typography } from '@material-ui/core'
import { DashboardLayout } from '../components'

export default function Dashboard() {
  return (
    <DashboardLayout
      left={
        <Typography variant="body1" color="textPrimary">
          Dashboard
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
