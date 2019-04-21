import { t } from 'ember-intl';

export default (t as unknown) as (
  ...args: Parameters<typeof t>
) => PropertyDecorator;

export { raw } from 'ember-intl';
