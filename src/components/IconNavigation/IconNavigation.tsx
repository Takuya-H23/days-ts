import { List } from '@material-ui/core'
import { Dashboard, Note } from '@material-ui/icons'
import { IconNav } from '../../elements'

export default function IconNavigation() {
  return (
    <List>
      <IconNav Icon={<Dashboard />} label="Dashboard" href="/dashboard" />
      <IconNav Icon={<Note />} label="Notes" href="/dashboard/notes" />
    </List>
  )
}
