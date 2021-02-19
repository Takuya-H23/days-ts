import { Button, Grid } from '@material-ui/core'

interface Props {
  children: React.ReactNode
  submitText?: string
  hideSubmit?: boolean
  onSubmit: (e: React.SyntheticEvent) => any
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

const Form = ({
  children,
  submitText,
  hideSubmit,
  onSubmit,
  spacing = 0,
}: Props) => {
  return (
    <Grid container component="form" onSubmit={onSubmit} spacing={spacing}>
      {children}
      <Grid item>
        <Button
          variant="contained"
          type="submit"
          style={{ display: hideSubmit ? 'none' : 'block' }}
        >
          {submitText || 'Submit'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Form
