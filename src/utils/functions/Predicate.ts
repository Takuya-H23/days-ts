type PredicateContramap = (x: any) => any
type PredicateRun = (x: any) => boolean

export interface Predicate {
  run: PredicateRun
  contramap: (f: PredicateContramap) => Predicate
  concat: (x: Predicate) => Predicate
}

const Predicate = (run: PredicateRun): Predicate => ({
  run,
  contramap: (f: PredicateContramap): Predicate => Predicate(x => run(f(x))),
  concat: (other: Predicate) => Predicate(x => run(x) && other.run(x)),
})

export default Predicate
