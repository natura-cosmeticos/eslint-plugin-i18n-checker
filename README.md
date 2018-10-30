# eslint-plugin-i18n-checker
[![Known Vulnerabilities](https://snyk.io/test/github/natura-cosmeticos/eslint-plugin-i18n-checker/badge.svg)](https://snyk.io/test/github/natura-cosmeticos/eslint-plugin-i18n-checker)
[![Build Status](https://api.travis-ci.org/natura-cosmeticos/eslint-plugin-i18n-checker.svg?branch=master)](https://travis-ci.org/natura-cosmeticos/eslint-plugin-i18n-checker)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9ee01fcbab76443393f4e01d9711cf6f)](https://www.codacy.com/app/fabricio_2/eslint-plugin-i18n-checker?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=natura-cosmeticos/eslint-plugin-i18n-checker&amp;utm_campaign=Badge_Grade)

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

In your `header.js` you have a call to your `i18n` function to get the localized value of the string *logout*: `translate('logout')`

The `i18n-checker` will verify if the `logout` is defined in each locale file you have.

# How to use

## Installation

```bash
npm i --save-dev '@naturacosmeticos/eslint-plugin-i18n-checker'

yarn add -D '@naturacosmeticos/eslint-plugin-i18n-checker'
```

## Configuration

In your eslintrc file you need to add `@naturacosmeticos/eslint-plugin-i18n-checker` in the `plugins` section.

### Options

You can configure the following options:

* **localesPath** - *string* - your locales relative path (*default is `/locales/`*)
* **messagesBasePath** - *string* - if your locales files has a base path you can pass it (*default is undefined*)
* **translationFunctionName** - *string* - the name of your translation function (*default is `translate`*)

Example:

```
"i18n-checker/path-in-locales": ['error',
  {
    localesPath: 'public/locales/',
    messagesBasePath: 'translations',
    translationFunctionName: 't'
  }
]
```

# Contributing

## Setup

Install the dependencies running `yarn` in the project folder. li

## Lint

Just run `yarn lint`

## Tests

You can run the following commands:

* `yarn test`
* `yarn test:watch`
