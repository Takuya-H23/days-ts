import { Grid, Box } from '@material-ui/core'
import { Header } from '../components'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={5} sm={4} md={3} lg={2} xl={2}>
          <Box p={[2, 2, 2, 2, 2]}>
            <div>navs</div>
          </Box>
        </Grid>
        <Grid item xs={7} sm={8} md={9} lg={10} xl={10}>
          <Box p={[2, 2, 2, 2, 2]} style={{ border: '1px solid' }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
