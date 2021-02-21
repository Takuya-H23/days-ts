import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { compose, prop, head } from 'ramda'

const getErrorMessage = compose(
  prop('message'),
  head,
  prop('errors'),
  prop('response')
)

interface Props {
  isError: boolean
  error?: any
}

export default function FormAlert({ isError, error }: Props) {
  return isError ? (
    <Snackbar
      open={isError}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {getErrorMessage(error)}
      </Alert>
    </Snackbar>
  ) : null
}
