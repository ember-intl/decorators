import Application from '@ember/application';

import loadInitializers from 'ember-load-initializers';

import config from './config/environment';
import Resolver from './resolver';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
