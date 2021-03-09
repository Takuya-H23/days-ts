import { gql } from 'graphql-request'
import { useMutation } from '../../../hooks'
import { Field, Form, FormAlert, LinearProgress } from '../../../elements'
import { DashboardLayout } from '../../../components'

const query = gql`
  mutation($input: CreateNoteCategoryInput) {
    createNoteCategory(input: $input) {
      note_category_id
      user_id
      note_category
      created_at
    }
  }
`
const iv = { noteCategory: '' }
const id = 'createNoteCategory'

export default function Notes() {
  const { input, error, mutation, handleChange, handleSubmit } = useMutation({
    iv,
    id,
    query,
  })

  // console.log(mutation)

  return (
    <DashboardLayout>
      <LinearProgress isLoading={mutation.isLoading} />
      <FormAlert isError={mutation.isError} error={mutation.error} />
      <Form onSubmit={handleSubmit} submitText="Submit" spacing={3} hideSubmit>
        <Field
          id="createNoteCategory"
          name="noteCategory"
          value={input.noteCategory}
          onChange={handleChange}
          error={Boolean(error.noteCategory)}
        />
      </Form>
    </DashboardLayout>
  )
}
