import { testWarning } from './test'

testWarning()

console.log(__VERSION__)
const a = 1
if (__DEV__ && true) {
  if (a === Math.random()) {
    console.log('this should show only in dev')
  }
}
