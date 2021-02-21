import { render } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ThemeProvider } from '@material-ui/core'
import { darkTheme } from './styles/theme'

const queryClient = new QueryClient()

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: Omit<any, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
