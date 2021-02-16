import { Grid } from '@material-ui/core'

interface Props {
  children: React.ReactNode
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

const Form = ({ children, spacing = 0 }: Props) => {
  return (
    <Grid container component="form" spacing={spacing}>
      {children}
    </Grid>
  )
}

export default Form
