import { gql } from 'graphql-request'
import { useMutation } from '../../../hooks'
import { Field, Form } from '../../../elements'
import { DashboardLayout } from '../../../components'

const query = gql`
  mutation($input: CreateNoteCategoryInput) {
    createNoteCategory(input: $input) {
      note_category_id
      category
      created_at
    }
  }
`
const iv = { category: '' }
const id = 'createNoteCategory'

export default function Notes() {
  const { input, error, mutation, handleChange, handleSubmit } = useMutation({
    iv,
    id,
    query,
  })

  console.log(mutation)

  return (
    <DashboardLayout>
      <Form onSubmit={handleSubmit} submitText="Submit" spacing={3} hideSubmit>
        <Field
          id="createNoteCategory"
          name="category"
          value={input.category}
          onChange={handleChange}
          error={Boolean(error.category)}
        />
      </Form>
    </DashboardLayout>
  )
}
