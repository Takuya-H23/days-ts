import { render } from '../../utils/test-utils'
import Field, { toUpperHead } from './Field'

const renderWithBasicProps = props =>
  render(<Field value="value" onChange={jest.fn()} error={false} {...props} />)

test('should run toUpperCase on the first letter', () => {
  expect(toUpperHead('john doe')).toBe('John doe')
})

test('should render custom label when supplied', () => {
  const label = 'My custom label'
  const { getByLabelText } = renderWithBasicProps({
    id: 'testingUsername',
    name: 'username',
    label,
  })
  expect(getByLabelText(label)).toBeDefined()
})

test('should render name as a label when no label supplied', () => {
  const { getByLabelText } = renderWithBasicProps({
    id: 'testingDefaultLabel',
    name: 'username',
  })
  expect(getByLabelText('Username')).toBeDefined()
})

test('should render password type input', () => {
  const { getByLabelText } = render(
    //@ts-ignore
    <Field.Password
      id="testingPasswordType"
      name="password"
      value="password"
      onChange={jest.fn()}
      error={false}
    />
  )
  expect(getByLabelText('Password').getAttribute('type')).toBe('password')
})
