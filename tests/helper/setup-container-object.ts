import { setOwner } from '@ember/application';

import TestContext from '../test-context';

export default function setupContainerObject(hooks: NestedHooks) {
  hooks.beforeEach(function (this: TestContext) {
    const { owner } = this;

    class ContainerObject {
      constructor() {
        setOwner(this, owner);
      }
    }

    this.ContainerObject = ContainerObject;
  });
}
