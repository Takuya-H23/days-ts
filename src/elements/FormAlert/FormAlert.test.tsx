import { render } from '../../utils/test-utils'
import FormAlert from './FormAlert'

const message = 'My test error message'
const error = { response: { errors: [{ message }] } }

test('should not render when no error', () => {
  const { container } = render(<FormAlert isError={false} />)
  expect(container.firstChild).toBeNull()
})

test('should render when error alert', () => {
  const { getByText } = render(<FormAlert isError error={error} />)
  expect(getByText(message)).toBeDefined()
})
