import warning from 'tiny-warning'

function test(b: boolean) {
  console.log()
  warning(b, 'ovo je warning')
}

export function testWarning() {
  test(false)
}
