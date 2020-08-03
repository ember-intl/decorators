import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { intl } from '@ember-intl/decorators';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';

import IntlService from 'ember-intl/services/intl';
import { setupIntl } from 'ember-intl/test-support';

import setupContainerObject from '../helper/setup-container-object';
import TestContext from '../test-context';

module('Unit | @intl', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}'
  });
  setupContainerObject(hooks);

  test('basic functionality', function (this: TestContext, assert) {
    class TestObject extends this.ContainerObject {
      amount = 1.23;

      currency = 'EUR';

      @intl('amount', 'currency')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formatted: string = (intlService: IntlService) =>
        intlService.formatNumber(this.amount, {
          style: 'currency',
          currency: this.currency
        });
    }
    const object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      '€1.23',
      'formats the value as expected'
    );

    run(() => set(object, 'amount', 4.56));
    assert.strictEqual(
      get(object, 'formatted'),
      '€4.56',
      'depends on first parameter'
    );

    run(() => set(object, 'currency', 'USD'));
    assert.strictEqual(
      get(object, 'formatted'),
      '$4.56',
      'depends on second parameter'
    );

    run(() => this.intl.setLocale('de'));
    assert.ok(
      // non-standard whitespace for some reason
      /4,56\s\$/.test(get(object, 'formatted')),
      'listens for locale changes'
    );
  });

  test('accepts arrow functions', function (this: TestContext, assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};
    let object: TestObject;

    class TestObject extends this.ContainerObject {
      @intl
      formatted = (i: IntlService, propertyKey: string) => {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      };
    }
    object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });

  test('accepts methods', function (this: TestContext, assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};
    let object: TestObject;

    class TestObject extends this.ContainerObject {
      @intl
      formatted(i: IntlService, propertyKey: string) {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      }
    }
    object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });
});
