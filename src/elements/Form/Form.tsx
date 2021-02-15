import React from 'react'
import { Grid } from '@material-ui/core'

interface Props {
  children: React.ReactNode
}

const Form: React.FC = ({ children }) => {
  return (
    <Grid container component="form">
      {children}
    </Grid>
  )
}

export default Form
