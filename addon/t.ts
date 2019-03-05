import { computedDecoratorWithRequiredParams } from '@ember-decorators/utils/computed';
import { t as translationMacro } from 'ember-intl';
import { Descriptor } from '@ember-decorators/utils/decorator';

type Options = Record<string, string>;

const t = computedDecoratorWithRequiredParams(
  (maybeDesc: Descriptor | string, maybeParams: Options | [string, Options]) =>
    Array.isArray(maybeParams)
      ? translationMacro(...maybeParams) // legacy
      : translationMacro(maybeDesc as string, maybeParams), // new
  't'
) as (key: string, options?: Options) => PropertyDecorator;

export default t;

export { raw } from 'ember-intl';
