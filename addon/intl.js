import { decoratorWithParams } from '@ember-decorators/utils/decorator';
import { computedDecorator } from '@ember-decorators/utils/computed';
import { assert } from '@ember/debug';
import extractValue from './utils/extract-value';
import IntlComputedProperty from './utils/intl-computed-property';

export default decoratorWithParams((desc, dependentKeys = []) => {
  const { initializer } = desc;
  delete desc.initializer;

  return computedDecorator(
    desc =>
      new IntlComputedProperty(function(intl, propertyKey) {
        const fn = extractValue({ ...desc, initializer }, this);
        assert(
          `@intl: You need to decorate a function, but you decorated '${fn}'.`,
          typeof fn === 'function'
        );

        return fn.call(this, intl, propertyKey);
      }, ...dependentKeys)
  )(desc);
});
