import ComputedProperty from '@ember/object/computed';

import { Service as IntlService } from 'ember-intl';

export const __intlInjectionName: string;

type GetterFn<Ctx> = (
  this: Ctx,
  intl: IntlService,
  propertyKey: string,
  ctx: Ctx
) => string;

export default function intl(
  ...dependentKeysAndGetterFn: (string | GetterFn<object>)[]
): ComputedProperty<() => ReturnType<GetterFn<object>>>;
