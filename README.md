# eslint-plugin-i18n-checker

This eslint plugin helps you identify what locales keys are not included in your locales files.

Considering the follow scenario:

```
--locales/
----en-us.json
----es-pe.json
----pt-br.json
--src/
-----components/
-------header.js
```

In your `header.js` you have a call to your `i18n` function to get the localized value of the string `logout`: `translate('logout')`.

The `i18n-checker` will verify if the `logout` is defined in each locale file you have.

# Contributing

## Setup

Install the dependencies running `yarn` in the project folder. li

## Lint

Just run `yarn lint`

## Tests

You can run the following commands:

* `yarn test`
* `yarn test:watch`