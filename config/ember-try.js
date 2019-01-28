'use strict';

const getChannelURL = require('ember-source-channel-url');
const flatMap = require('lodash.flatmap');
const merge = require('lodash.merge');

const withDecoratorVariants = scenarios =>
  flatMap(scenarios, scenario => [
    merge({}, scenario, {
      name: `${scenario.name}-e-d-v3`,
      npm: {
        devDependencies: {
          '@ember-decorators/babel-transforms': '^3.1.2'
        },
        dependencies: {
          '@ember-decorators/utils': '^3.1.2'
        }
      }
    }),
    merge({}, scenario, {
      name: `${scenario.name}-e-d-v4`,
      npm: {
        devDependencies: {
          '@ember-decorators/babel-transforms': '^4.0.0'
        },
        dependencies: {
          '@ember-decorators/utils': '^4.0.0'
        }
      }
    }),
    merge({}, scenario, {
      name: `${scenario.name}-e-d-v5`,
      npm: {
        devDependencies: {
          '@ember-decorators/babel-transforms': '^5.0.0'
        },
        dependencies: {
          '@ember-decorators/utils': '^5.0.0'
        }
      }
    })
  ]);

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then(urls => {
    return {
      useYarn: true,
      scenarios: withDecoratorVariants([
        {
          name: 'ember-lts-2.18',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': '~2.18.0'
            }
          }
        },
        {
          name: 'ember-lts-3.4',
          npm: {
            devDependencies: {
              'ember-source': '~3.4.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0]
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1]
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2]
            }
          }
        },
        // The default `.travis.yml` runs this scenario via `npm test`,
        // not via `ember try`. It's still included here so that running
        // `ember try:each` manually or from a customized CI config will run it
        // along with all the other scenarios.
        {
          name: 'ember-default',
          npm: {
            devDependencies: {}
          }
        }
      ])
    };
  });
};
