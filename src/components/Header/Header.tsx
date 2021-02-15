import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h1" color="textPrimary">
          Days
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
