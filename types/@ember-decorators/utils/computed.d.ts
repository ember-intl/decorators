// @TODO: re-enable once TypeScript parser works properly
// eslint-disable-next-line no-unused-vars
import ComputedProperty from '@ember/object/computed';
import { Descriptor } from './decorator';

export function computedDecorator(
  fn: (desc: Descriptor, params?: any[]) => ComputedProperty<any>
): PropertyDecorator & ((desc: Descriptor) => Descriptor);

export function computedDecoratorWithRequiredParams<Params extends any[]>(
  fn: (desc: Descriptor, params: Params) => ComputedProperty<any>,
  name?: string
): (
  ...params: Params
) => PropertyDecorator & ((desc: Descriptor) => Descriptor);
