module.exports = {
  rules: {
    'path-in-locales': require('./src/path-in-locales'),
  },
  rulesConfig: {
    'path-in-locales': 0,
  },
  configs: {
    recommended: {
      plugins: [
        'i18n',
      ],
      rules: {
        'i18n/path-in-locales': 'warn',
      }
    }
  }
};
