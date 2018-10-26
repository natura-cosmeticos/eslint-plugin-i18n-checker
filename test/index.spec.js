const { RuleTester } = require('eslint');
const rule = require('../');

const ruleTester = new RuleTester();

ruleTester.run('i18n-checker', rule, {
  invalid: [
    {
      code: 'translate("notFoundString")',
      errors: [
        {
          message: 'notFoundString was not found in the following locale(s): es-pr.js',
        },
      ],
      options: [
        {
          localesPath: ['../test/fixtures/locales/es-pr.js'],
        },
      ],
    },
  ],
  valid: [
    {
      code: 'translate("initialKits")',
      options: [
        {
          localesPath: ['../test/fixtures/locales/es-pr.js'],
        },
      ],
    },
    {
      code: 'translate("home.title")',
      options: [
        {
          localesPath: ['../test/fixtures/locales/es-pr.js'],
        },
      ],
    },
  ],
});

