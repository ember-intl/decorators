interface Descriptor {
  kind: 'class' | 'method' | 'field' | 'accessor';
  key: string;
  placement: 'prototype' | 'own' | 'static';
  initializer?: () => any;
  descriptor: PropertyDescriptor;
}

export function decoratorWithParams<Params extends any[]>(
  fn: (desc: Descriptor, params?: Params) => Descriptor
): ((...params: Params) => PropertyDecorator) & PropertyDecorator;
