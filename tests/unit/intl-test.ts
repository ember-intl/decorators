import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl } from 'ember-intl/test-support';
import { intl } from '@ember-intl/decorators';
import TestContext from '../test-context';
import setupContainerObject from '../helper/setup-container-object';
import IntlService from 'ember-intl/services/intl';

module('Unit | @intl', function(hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}'
  });
  setupContainerObject(hooks);

  test('basic functionality', function(this: TestContext, assert) {
    class TestObject extends this.ContainerObject {
      amount = 1.23;
      currency = 'EUR';

      @intl('amount', 'currency')
      // @ts-ignore
      formatted: string = (intl: IntlService) =>
        intl.formatNumber(this.amount, {
          style: 'currency',
          currency: this.currency
        });
    }
    const object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      '€1.23',
      'formats the value as epected'
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

  test('accepts arrow functions', function(this: TestContext, assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};

    class TestObject extends this.ContainerObject {
      @intl
      formatted = (i: IntlService, propertyKey: string) => {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      };
    }
    const object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });

  test('accepts methods', function(this: TestContext, assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};

    class TestObject extends this.ContainerObject {
      @intl
      formatted(i: IntlService, propertyKey: string) {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      }
    }
    const object = new TestObject();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });
});
