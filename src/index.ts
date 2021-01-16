export function demo(): void {
  if (__DEV__) {
    console.log('this should show only in dev')
  }
}
demo()
