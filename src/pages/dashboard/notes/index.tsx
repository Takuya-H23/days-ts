import { gql } from 'graphql-request'
import { useMutation } from '../../../hooks'
import { Field, Form } from '../../../elements'

/**
const query = gql`
  mutation {
    note_category_id
    category
    created_at
  }
`
*/
const iv = { category: '' }
const id = 'createNoteCategory'

export default function Notes() {
  /**
  const { input, error, mutation, handleChange, handleSubmit } = useMutation({
    iv,
    id,
    query,
  })
  */
  return (
    <div>
      <Form onSubmit={() => {}} submitText="Submit" spacing={3}>
        <Field
          id="createNoteCategory"
          name="category"
          value="value"
          onChange={() => 'vlue'}
          error={false}
        />
      </Form>
    </div>
  )
}
