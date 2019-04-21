import { TestContext as BaseTextContext } from 'ember-intl/test-support';

export default interface TestContext extends BaseTextContext {
  ContainerObject: { new (): object };
}
