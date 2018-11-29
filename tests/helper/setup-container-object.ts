import EmberObject from '@ember/object';
import { setOwner } from '@ember/application';
import TestContext from '../test-context';

export default function setupContainerObject(hooks: NestedHooks) {
  // @TODO: re-enable once TypeScript parser works properly
  // eslint-disable-next-line no-unused-vars
  hooks.beforeEach(function(this: TestContext) {
    const { owner } = this;

    class ContainerObject extends EmberObject {
      constructor() {
        super();
        setOwner(this, owner);
      }
    }

    this.ContainerObject = ContainerObject;
  });
}
