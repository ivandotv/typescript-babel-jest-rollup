const a = {
  name: 'ivan',
  lastName: 'none',
  p1: {
    p2: {
      nick: 'ivx'
    }
  }
}
if (a?.p1?.p2?.nick) {
  console.log('nic')
}
const b = undefined

console.log(b ?? 'test')
// ovo gore je sve ok
