import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// const theme = createMuiTheme()
const base: any = {
  typography: {
    h1: {
      fontSize: '3rem',
      fontFamily: ['Roboto', 'sans-serif'].join(', ')
    }
  }
}

export const darkTheme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      text: {
        primary: '#FFFFFF',
        secondary: '#818181'
      },
      background: {
        default: '#161618',
        paper: '#212124'
      },
      secondary: {
        main: '#000000'
      }
    }
  },
  base
)
