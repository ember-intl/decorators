import { setOwner } from '@ember/application';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject, { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { setupIntl } from 'ember-intl/test-support';
import { intl } from '@ember-intl/decorators';

module('Unit | @intl', function(hooks) {
  setupTest(hooks);
  setupIntl(hooks, {
    'no.interpolations': 'text with no interpolations',
    'with.interpolations': 'Clicks: {clicks}'
  });

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');

    const { owner } = this;
    this.ContainerObject = class extends EmberObject {
      constructor() {
        super();
        setOwner(this, owner);
      }
    };
  });

  test('basic functionality', function(assert) {
    const object = new class extends this.ContainerObject {
      amount = 1.23;
      currency = 'EUR';

      @intl('amount', 'currency')
      formatted = intl =>
        intl.formatNumber(this.amount, {
          style: 'currency',
          currency: this.currency
        });
    }();

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

  test('accepts arrow functions', function(assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};

    const object = new class extends this.ContainerObject {
      @intl
      formatted = (i, propertyKey) => {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      };
    }();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });

  test('accepts methods', function(assert) {
    assert.expect(4);

    const intlService = this.intl;
    const IDENTITY = {};

    const object = new class extends this.ContainerObject {
      @intl
      formatted(i, propertyKey) {
        assert.strictEqual(i, intlService, 'intl service is passed');
        assert.strictEqual(propertyKey, 'formatted', 'propertyKey is passed');
        assert.strictEqual(this, object, 'this context is correct');

        return IDENTITY;
      }
    }();

    assert.strictEqual(
      get(object, 'formatted'),
      IDENTITY,
      'return value is passed'
    );
  });
});
