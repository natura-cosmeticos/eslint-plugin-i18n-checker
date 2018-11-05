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
        'i18n-checker',
      ],
      rules: {
        'i18n-checker/path-in-locales': 'warn',
      }
    }
  }
};
