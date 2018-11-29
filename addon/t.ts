import { macro } from '@ember-decorators/object/computed';
import { translationMacro } from 'ember-intl';

const t: (key: string, options?: object) => PropertyDecorator = macro(
  translationMacro
);

export default t;
