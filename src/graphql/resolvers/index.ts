import createNoteCategory from './createNoteCategory'
import signUp from './singUp'
import signIn from './signIn'
import hello from './hello'
import fetchUser from './fetchUser'

export default {
  Query: {
    hello,
    fetchUser,
  },
  Mutation: { createNoteCategory, signIn, signUp },
}
