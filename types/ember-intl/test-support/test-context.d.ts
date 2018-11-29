import { TestContext as BaseTextContext } from 'ember-test-helpers';
import IntlService from 'ember-intl/services/intl';

export default interface TestContext extends BaseTextContext {
  intl: IntlService;
}
