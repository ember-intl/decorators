import ComputedProperty from '@ember/object/computed';
import IntlService from './services/intl';

type GetterFn<Ctx> = (
  this: Ctx,
  intl: IntlService,
  propertyKey: string,
  ctx: Ctx
) => string;

export default class IntlComputedProperty<
  Ctx extends object,
  Fn extends GetterFn<Ctx> = GetterFn<Ctx>
> extends ComputedProperty<Fn> {
  constructor(...dependentKeysAndGetterFn: (string | Fn)[]);
}
