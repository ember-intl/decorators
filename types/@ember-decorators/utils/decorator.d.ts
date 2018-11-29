interface Descriptor {
  initializer?: () => any;
}

export function decoratorWithParams<Params extends any[]>(
  fn: (desc: Descriptor, params?: Params) => Descriptor
): ((...params: Params) => PropertyDecorator) & PropertyDecorator;
