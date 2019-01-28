import EmberObject from '@ember/object';
import { setOwner } from '@ember/application';
import TestContext from '../test-context';

export default function setupContainerObject(hooks: NestedHooks) {
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
