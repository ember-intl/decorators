/* eslint-disable no-param-reassign, prefer-destructuring */

import { decoratorWithParams } from '@ember-decorators/utils/decorator';
import { assert } from '@ember/debug';
import { Service as IntlService, intl as intlMacro } from 'ember-intl';

type GetterFn = (intl: IntlService, propertyKey: string) => any;

export default (decoratorWithParams(function intl<Target extends object>(
  target: Target,
  key: keyof Target,
  desc: PropertyDescriptor & { initializer: () => GetterFn },
  dependentKeys: string[] = []
) {
  const value: GetterFn = desc.value;
  const initializer: () => GetterFn = desc.initializer;
  delete desc.value;
  delete desc.initializer;

  const cp = intlMacro(...dependentKeys, function(
    intl: IntlService, // eslint-disable-line no-shadow
    propertyKey: string
  ) {
    const fn: GetterFn = value || initializer.call(this);
    assert(
      `@intl: You need to decorate a function, but you decorated '${fn}'.`,
      typeof fn === 'function'
    );

    return fn.call(this, intl, propertyKey);
  });

  // @ts-ignore
  return cp(target, key, desc);
}) as unknown) as ((
  ...args: Parameters<typeof intlMacro>
) => PropertyDecorator & MethodDecorator) &
  PropertyDecorator &
  MethodDecorator;
