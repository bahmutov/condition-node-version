# condition-node-version

> Plugin for [semantic-release][sr] that only allows publishing from a specific NodeJS version

[![NPM][condition-node-version-icon] ][condition-node-version-url]

[![Build status][condition-node-version-ci-image] ][condition-node-version-ci-url]
[![dependencies][condition-node-version-dependencies-image] ][condition-node-version-dependencies-url]
[![devdependencies][condition-node-version-devdependencies-image] ][condition-node-version-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]
[![standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[sr]: https://github.com/semantic-release/semantic-release

## Why?

You want to publish your module to NPM using the [semantic-release][sr] task, but only if the unit tests
on all Node versions pass. TravisCI does not have "build-after-all" step, see
[this issue](https://github.com/travis-ci/travis-ci/issues/929)
and the module [travis-after-all](https://www.npmjs.com/package/travis-after-all) that tries
to get around this. Unfortunately, this is unreliable. My builds often time out, with some builds
in the matrix waiting on each other in a circle.

This is why I wrote this plugin.

## Install and configuration

    npm install --save-dev condition-node-version

Add the `release` configuration to the package.json, just like
[semantic-release docs show](https://github.com/semantic-release/semantic-release#plugins). All
we need is to specify this plugin and the exact version of Node we want to publish from

```js
"release": {
  "verifyConditions": {
    "path": "condition-node-version",
    "node": "4.2.2",
    "verbose": true // optional
  }
}
```

Make sure the same Node version is listed in your `.travis.yml` file

```yaml
node_js:
  - '5'
  - '4.2.2'
  - '0.12'
after_success:
  - npm run semantic-release
```

Note that we no longer have to wait on multiple travis jobs, thus it is simple `after_success` call.

To combine this plugin with Travis environment check use a list of plugins. For example, to check
Travis environment and Node version

    npm install --save-dev @semantic-release/condition-travis

Then list the plugins in package.json

```json
"release": {
  "verifyConditions": [
    {
      "path": "@semantic-release/condition-travis"
    }, {
      "path": "condition-node-version",
      "node": "4.2.2"
    }
  ]
}
```

You can use semantic ranges in the condition, for example

```json
"release": {
  "verifyConditions": [
    {
      "path": "condition-node-version",
      "node": ">=4.2.0"
    }
  ]
}
```

The check is done using [semver.satisfies](https://github.com/npm/node-semver#ranges-1).

## Notes

Because the module can be published from a single version of NodeJS, while the other version builds
break, you should keep the CI build green to make sure a published version of your module is really
working for everyone.

## Related

* [condition-circle](https://github.com/bahmutov/condition-circle) is my plugin for semantic-release
  from CircleCI

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/condition-node-version/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[condition-node-version-icon]: https://nodei.co/npm/condition-node-version.png?downloads=true
[condition-node-version-url]: https://npmjs.org/package/condition-node-version
[condition-node-version-ci-image]: https://travis-ci.org/bahmutov/condition-node-version.png?branch=master
[condition-node-version-ci-url]: https://travis-ci.org/bahmutov/condition-node-version
[condition-node-version-dependencies-image]: https://david-dm.org/bahmutov/condition-node-version.png
[condition-node-version-dependencies-url]: https://david-dm.org/bahmutov/condition-node-version
[condition-node-version-devdependencies-image]: https://david-dm.org/bahmutov/condition-node-version/dev-status.png
[condition-node-version-devdependencies-url]: https://david-dm.org/bahmutov/condition-node-version#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
