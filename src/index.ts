import { testWarning } from './test'

testWarning()

console.log(__VERSION__)
const a = 1
if (__DEV__) {
  if (a === Math.random()) {
    console.log('this should show only in dev')
  }
}
