import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { t } from '@ember-intl/decorators';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';

import { setupIntl, addTranslations } from 'ember-intl/test-support';

import setupContainerObject from '../helper/setup-container-object';
import TestContext from '../test-context';

module('Unit | @t', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}'
  });
  setupContainerObject(hooks);

  test('defines a computed property that translates without interpolations', function (this: TestContext, assert) {
    class TestObject extends this.ContainerObject {
      @t('no.interpolations')
      property!: string;
    }
    const object = new TestObject();

    assert.strictEqual(get(object, 'property'), 'text with no interpolations');
  });

  test('defines a computed property that translates with interpolations', function (this: TestContext, assert) {
    class TestObject extends this.ContainerObject {
      numberOfClicks = 9;

      @t('with.interpolations', { clicks: 'numberOfClicks' })
      property!: string;
    }
    const object = new TestObject();

    assert.strictEqual(get(object, 'property'), 'Clicks: 9');
  });

  test('defines a computed property with dependencies', function (this: TestContext, assert) {
    class TestObject extends this.ContainerObject {
      numberOfClicks = 9;

      @t('with.interpolations', { clicks: 'numberOfClicks' })
      property!: string;
    }
    const object = new TestObject();

    run(() => set(object, 'numberOfClicks', 13));
    assert.strictEqual(get(object, 'property'), 'Clicks: 13');
  });

  test('defines a computed property that depends on the locale', function (this: TestContext, assert) {
    addTranslations('es', {
      'no.interpolations': 'texto sin interpolaciones'
    });

    class TestObject extends this.ContainerObject {
      @t('no.interpolations')
      property!: string;
    }
    const object = new TestObject();

    assert.strictEqual(get(object, 'property'), 'text with no interpolations');
    run(() => this.intl.setLocale('es'));

    assert.strictEqual(get(object, 'property'), 'texto sin interpolaciones');
  });
});
