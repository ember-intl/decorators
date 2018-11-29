export default function extractValue(desc: any, ctx: any = null) {
  if ('value' in desc.descriptor) {
    return desc.descriptor.value;
  }
  if (typeof desc.initializer === 'function') {
    const { initializer } = desc;
    delete desc.initializer;

    return initializer.call(ctx);
  }

  return null;
}
