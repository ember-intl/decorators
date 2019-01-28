import { computedDecoratorWithRequiredParams } from '@ember-decorators/utils/computed';
import { translationMacro } from 'ember-intl';

const t: (
  key: string,
  options?: object
) => PropertyDecorator = computedDecoratorWithRequiredParams(
  (_desc, params: [string, {}]) => translationMacro(...params),
  't'
);

export default t;
