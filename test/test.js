import test from 'ava'
import condition from '..'
import check from 'check-more-types'
import semver from 'semver'

test('foo', t => {
  t.pass()
})

test('condition', t => {
  t.is(typeof condition, 'function')
})

test.cb('fails without node option', t => {
  condition({}, {}, function (err, result) {
    t.ok(err instanceof Error)
    t.ok(check.unemptyString(err.message))
    t.end()
  })
})

test('satisfies versions', t => {
  t.ok(semver.satisfies('1.0.0', '1.0.0'))
  t.ok(!semver.satisfies('1.0.0', '2.0.0'))
  t.ok(!semver.satisfies('5.7.1', '1.3.2'))
})

test.cb('fails for non-matching version', t => {
  condition({ node: '1.3.2' }, {verbose: false}, function (err, result) {
    t.ok(err instanceof Error)
    t.ok(check.unemptyString(err.message))
    t.end()
  })
})

test.cb('passes for matching version ranges', t => {
  condition({ node: '>0.0.0' }, {}, function (err, result) {
    t.ok(err === null)
    t.end()
  })
})
