const { assert } = require('chai');

const pathLocalizator = require('../src/path-localizator');

describe('pathLocalizator', () => {
  describe('when path is a string (ex: "title")', () => {
    it('return undefined when path is found in locales files', () => {
      // given
      const locales = ['../test/fixtures/locales/es-pr.js'];
      const path = 'initialKits';
      // when
      const result = pathLocalizator(path, locales);

      // then
      assert.isEmpty(result);
    });

    it('return error when path is not found in locales files', () => {
      // given
      const filename = 'es-pr.js';
      const locales = [`../test/fixtures/locales/${filename}`];
      const path = 'notFoundString';
      // when
      const result = pathLocalizator(path, locales);

      // then
      assert.isNotEmpty(result);
      assert.include(result.error, filename);
    });
  });

  describe('when path is a path (ex. home.title)', () => {
    it('return undefined when path is found in locales files', () => {
      // given
      const locales = ['../test/fixtures/locales/es-pr.js'];
      const path = 'home.title';
      // when
      const result = pathLocalizator(path, locales);

      // then
      assert.isEmpty(result);
    });

    it('return error when path is not found in locales files', () => {
      // given
      const filename = 'es-pr.js';
      const locales = [`../test/fixtures/locales/${filename}`];
      const path = 'home.subtitle';
      // when
      const result = pathLocalizator(path, locales);

      // then
      assert.isNotEmpty(result);
      assert.include(result.error, filename);
    });
  });
});
