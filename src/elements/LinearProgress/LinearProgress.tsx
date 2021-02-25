import { LinearProgress as MaterialLinearProgress } from '@material-ui/core'
import useStyles from './useStyles'

interface Props {
  isLoading: boolean
}

export default function LinearProgress({ isLoading }: Props) {
  const classes = useStyles()

  return isLoading ? <MaterialLinearProgress classes={classes} /> : null
}
