import { render } from '../../utils/test-utils'
// import { toUpperHead } from './Field'
import Field, { toUpperHead } from './Field'

test('should run toUpperCase on the first letter', () => {
  expect(toUpperHead('john doe')).toBe('John doe')
})

test('should render custom label when supplied', () => {
  const customLabel = 'My custom label'
  const { getByLabelText } = render(
    <Field
      name="test"
      label={customLabel}
      value="value"
      onChange={jest.fn()}
      error={false}
    />
  )
})
