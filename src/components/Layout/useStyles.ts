import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(({ breakpoints }) => ({
  wrapper: ({ minHeight }: { minHeight?: boolean}) => ({
    minHeight: minHeight ? '100vh' : 'auto'  
  }),
  mainWrapper: {
    maxWidth: '90vw',
    width: breakpoints.values.lg,
    margin: '5rem auto',
  }
}))