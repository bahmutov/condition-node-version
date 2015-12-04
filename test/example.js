import test from 'ava'
import condition from '..'

test('foo', t => {
  t.pass()
})

test('condition', t => {
  t.is(typeof condition, 'function')
})

// test('bar', async t => {
//   t.plan(2);

//   const bar = Promise.resolve('bar').then(delay(200));

//   t.is(await bar, 'bar');
// });
