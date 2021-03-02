import { Box, Grid } from '@material-ui/core'
import Header from '../Header'
import IconNavigation from '../IconNavigation'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box bgcolor="background.default">
      <Header />
      <Box pt={2} bgcolor="background.paper">
        <Grid container>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            style={{ border: '1px solid #fff' }}
          >
            <Box p={1}>
              <IconNavigation />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={8}
            md={9}
            lg={10}
            xl={10}
            style={{ border: '1px solid #fff' }}
          >
            <Box p={1}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
