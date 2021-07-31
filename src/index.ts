export function demo(): void {
  if (__DEV__) {
    console.log('this should show only in dev')
  }
  if (process.env.NODE_ENV === 'production') {
    console.log('this should only be seen in server modules')
  }
  console.log(__VERSION__)
}
demo()

async function asyncTest(): Promise<void> {
  return Promise.resolve()
}

;(async () => {
  await asyncTest()
})()

// @ts-expect-error - test code removal
function not_used(): void {
  console.log('this should not be present after minification')
}
