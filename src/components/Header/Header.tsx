import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h1">Days</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
