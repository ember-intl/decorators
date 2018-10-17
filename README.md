# ember-intl-decorators

[![Build Status](https://travis-ci.org/ember-intl/ember-intl-decorators.svg)](https://travis-ci.org/ember-intl/ember-intl-decorators)
[![npm version](https://badge.fury.io/js/ember-intl-decorators.svg)](http://badge.fury.io/js/ember-intl-decorators)
[![Download Total](https://img.shields.io/npm/dt/ember-intl-decorators.svg)](http://badge.fury.io/js/ember-intl-decorators)
[![Ember Observer Score](https://emberobserver.com/badges/ember-intl-decorators.svg)](https://emberobserver.com/addons/ember-intl-decorators)
[![Ember Versions](https://img.shields.io/badge/Ember.js%20Versions-%5E2.12%20%7C%7C%20%5E3.0-brightgreen.svg)](https://travis-ci.org/ember-intl/ember-intl-decorators)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![dependencies](https://img.shields.io/david/ember-intl/ember-intl-decorators.svg)](https://david-dm.org/ember-intl/ember-intl-decorators)
[![devDependencies](https://img.shields.io/david/dev/ember-intl/ember-intl-decorators.svg)](https://david-dm.org/ember-intl/ember-intl-decorators)

This addon provides utility [decorators](https://github.com/tc39/proposal-decorators)
to use [ember-intl] with ES6 class syntax.

[ember-intl]: https://github.com/ember-intl/ember-intl

## Installation

Install [ember-intl][ember-intl] and ember-intl-decorators:

```
ember install ember-intl ember-intl-decorators
```

## Usage

### `@t`

Decorator version of the [ember-intl `translationMacro`](https://github.com/ember-intl/ember-intl/blob/master/docs/translating-text.md#computed-property-macro).

```js
import Component from '@ember/component';
import { t } from 'ember-intl-decorators';

class ExampleComponent extends Component {
  name = 'Tom';

  @t('messages.welcome', { firstName: 'name' }) message;
}
```
