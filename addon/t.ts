import { computedDecoratorWithRequiredParams } from '@ember-decorators/utils/computed';
import { t as translationMacro } from 'ember-intl';

const t: (
  key: string,
  options?: object
) => PropertyDecorator = computedDecoratorWithRequiredParams(
  translationMacro,
  't'
);

export default t;

export { raw } from 'ember-intl';
