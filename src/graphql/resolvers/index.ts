import createNoteCategory from './createNoteCategory'
import signUp from './singUp'
import signIn from './signIn'
import hello from './hello'

export default {
  Query: {
    hello,
  },
  Mutation: { createNoteCategory, signIn, signUp },
}
