import signUp from './singUp'
import signIn from './signIn'
import hello from './hello'

export default {
  Query: {
    hello
  },
  Mutation: {
    signIn,
    signUp,
  }
}