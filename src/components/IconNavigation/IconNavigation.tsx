import { List } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { IconNav } from '../../elements'

export default function IconNavigation() {
  return (
    <List>
      <IconNav Icon={<DashboardIcon />} text="Dashboard" />
    </List>
  )
}
