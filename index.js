function conditionNodeVersion (options, config, callback) {
  console.log('plugin options', options)

  function fail (message) {
    return callback(new Error(message))
  }

  if (typeof options.node !== 'string') {
    return fail('Missing node version in the config')
  }

  if (process.versions.node !== options.node) {
    return fail('Only allowed to publish from Node ' +
      options.node + ' not from ' + process.versions.node)
  }

  console.log('ok to publish from this version of Node', options.node)

  callback(null)
}

module.exports = conditionNodeVersion
