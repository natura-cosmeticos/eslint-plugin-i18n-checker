const { assert } = require('chai');

const PathLocator = require('../src/path-locator');

describe('pathLocator', () => {
  describe('when path is a string (ex: "title")', () => {
    it('return undefined when path is found in locales files', () => {
      // given
      const locales = ['../test/fixtures/locales/es-pr.js'];
      const path = 'initialKits';
      const pathLocator = new PathLocator(locales);
      // when
      const result = pathLocator.call(path);

      // then
      assert.isEmpty(result);
    });

    it('return error when path is not found in locales files', () => {
      // given
      const filename = 'es-pr.js';
      const locales = [`../test/fixtures/locales/${filename}`];
      const path = 'notFoundString';
      const pathLocator = new PathLocator(locales);
      // when
      const result = pathLocator.call(path);

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
      const pathLocator = new PathLocator(locales);
      // when
      const result = pathLocator.call(path);

      // then
      assert.isEmpty(result);
    });

    it('return error when path is not found in locales files', () => {
      // given
      const filename = 'es-pr.js';
      const locales = [`../test/fixtures/locales/${filename}`];
      const path = 'home.subtitle';
      const pathLocator = new PathLocator(locales);
      // when
      const result = pathLocator.call(path);

      // then
      assert.isNotEmpty(result);
      assert.include(result.error, filename);
    });
  });
});
