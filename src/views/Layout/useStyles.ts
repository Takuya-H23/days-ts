import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(({ breakpoints }) => ({
  wrapper: {
    maxWidth: '90vw',
    width: breakpoints.values.lg,
    margin: '5rem auto' 
  }
}))