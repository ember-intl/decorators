import { decoratorWithParams } from '@ember-decorators/utils/decorator';
import { computedDecorator } from '@ember-decorators/utils/computed';
import { assert } from '@ember/debug';
import extractValue from './utils/extract-value';
import { IntlComputedProperty } from 'ember-intl';
import IntlService from 'ember-intl/services/intl';
import { Descriptor } from '@ember-decorators/utils/decorator';

export default decoratorWithParams(
  (desc: Descriptor, dependentKeys: string[] = []) => {
    const { initializer } = desc;
    delete desc.initializer;

    return computedDecorator(
      desc =>
        new IntlComputedProperty<object>(...dependentKeys, function(
          intl: IntlService,
          propertyKey: string
        ) {
          const fn = extractValue({ ...desc, initializer }, this);
          assert(
            `@intl: You need to decorate a function, but you decorated '${fn}'.`,
            typeof fn === 'function'
          );

          return fn.call(this, intl, propertyKey);
        })
    )(desc);
  }
);
