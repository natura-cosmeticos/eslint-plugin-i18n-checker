const _ = require('lodash');

class PathLocator {
  constructor(locales) {
    this.translations = this.getTranslations(locales);
  }

  getTranslations(locales) {
    const translations = [];

    locales.forEach((localeFile) => {
      // TODO handle when file is not found
      translations.push({
        file: localeFile,
        messages: require(localeFile), // eslint-disable-line
      });
    });

    return translations;
  }

  checkPathInTranslation(path) {
    const filesWherePathIsNotFound = [];

    this.translations.forEach(({ messages, file }) => {
      const localizedString = _.get(messages.translation, path);

      if (_.isEmpty(localizedString)) {
        const filename = file.split('/').pop();

        filesWherePathIsNotFound.push(filename);
      }
    });

    return filesWherePathIsNotFound;
  }

  call(path) {
    const filesWherePathIsNotFound = this.checkPathInTranslation(path);

    if (!_.isEmpty(filesWherePathIsNotFound)) {
      return {
        error: `${path} was not found in the following locale(s): ${filesWherePathIsNotFound.join(',')}`,
      };
    }

    return {};
  }
}

module.exports = PathLocator;