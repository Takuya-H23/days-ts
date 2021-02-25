import { render } from '../../utils/test-utils'
import LinearProgress from './LinearProgress'

test('should return null when loading', () => {
  const { container } = render(<LinearProgress isLoading={false} />)
  expect(container.firstChild).toBeNull()
})

test('should render LinearProgress', () => {
  const { container } = render(<LinearProgress isLoading />)
  expect(container.firstChild).not.toBeNull()
})
