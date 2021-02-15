import React from 'react'
import { Box } from '@material-ui/core'
import { Header } from '../../components'
import useStyles from './useStyles'
interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { wrapper } = useStyles()

  return (
    <Box bgcolor="background.default">
      <Header />
      <Box className={wrapper}>{children}</Box>
    </Box>
  )
}

export default Layout
