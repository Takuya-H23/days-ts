import React from 'react'
import { Box } from '@material-ui/core'
import Header from '../Header'
import useStyles from './useStyles'

interface Props {
  children: React.ReactNode
  minHeight?: boolean
}

const Layout: React.FC<Props> = ({ children, minHeight }) => {
  const { mainWrapper, wrapper } = useStyles({ minHeight })

  return (
    <Box bgcolor="background.default" className={wrapper}>
      <Header />
      <Box className={mainWrapper}>{children}</Box>
    </Box>
  )
}

export default Layout
