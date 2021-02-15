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
        primary: '#FFFFFF'
      }
    }
  },
  base
)

// export const darkTheme = Object.assign({}, theme, dark)

// export const lightTheme = createMuiTheme({
//   palette: {
//     type: 'light'
//   }
// })
