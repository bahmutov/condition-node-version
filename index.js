function conditionNodeVersion (pluginConfig, config, callback) {
  console.log('condition node version config', pluginConfig)

  if (pluginConfig.verbose || pluginConfig.debug) {
    console.log('condition environment', config.env)
    console.log('condition options', config.options)
  }

  function fail (message) {
    return callback(new Error(message))
  }

  if (typeof pluginConfig.node !== 'string') {
    return fail('Missing node version in the config')
  }

  if (process.versions.node !== pluginConfig.node) {
    return fail('Only allowed to publish from Node ' +
      pluginConfig.node + ' not from ' + process.versions.node)
  }

  console.log('ok to publish from this version of Node', pluginConfig.node)

  callback(null)
}

module.exports = conditionNodeVersion
