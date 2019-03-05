/* eslint-disable no-param-reassign */

import { decoratorWithParams } from '@ember-decorators/utils/decorator';
import { computedDecorator } from '@ember-decorators/utils/computed';
import { assert } from '@ember/debug';
import { Service as IntlService, intl as intlMacro } from 'ember-intl';
import { Descriptor } from '@ember-decorators/utils/decorator';

type GetterFn = (intl: IntlService, propertyKey: string) => any;

export default decoratorWithParams(
  (desc: Descriptor, dependentKeys: string[] = []) => {
    let value: GetterFn;
    let initializer: () => GetterFn;

    switch (desc.kind) {
      case 'method':
        assert(
          `'${desc.key}' has to be a method on the prototype, not 'static'.`,
          desc.placement === 'prototype'
        );
        ({ value } = desc.descriptor);
        delete desc.descriptor.value;
        desc.kind = 'field';
        break;
      case 'field':
        assert(
          `'${
            desc.key
          }' has to be a field on the class instance, not 'static'.`,
          desc.placement === 'own'
        );
        assert(
          `'${desc.key}' has no initializer.`,
          typeof desc.initializer === 'function'
        );
        ({ initializer } = desc as Required<Descriptor>);
        delete desc.initializer;
        break;
      default:
        assert(`Unsupported kind '${desc.kind}' for '${desc.key}'.`, false);
    }

    return computedDecorator(() =>
      intlMacro(...dependentKeys, function(
        intl: IntlService,
        propertyKey: string
      ) {
        const fn = value || initializer.call(this);
        assert(
          `@intl: You need to decorate a function, but you decorated '${fn}'.`,
          typeof fn === 'function'
        );

        return fn.call(this, intl, propertyKey);
      })
    )(desc);
  }
);
