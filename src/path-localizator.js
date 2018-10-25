const _ = require('lodash');

const getTranslations = (locales) => {
  const translations = [];

  locales.forEach((localeFile) => {
    // todo handle when file is not found
    translations.push({
      file: localeFile,
      messages: require(localeFile), // eslint-disable-line
    });
  });

  return translations;
};

const checkPathInTranslation = (translations, path) => {
  const filesWherePathIsNotFound = [];

  translations.forEach(({ messages, file }) => {
    const localizedString = _.get(messages.translation, path);

    if (_.isEmpty(localizedString)) {
      const filename = file.split('/').pop();

      filesWherePathIsNotFound.push(filename);
    }
  });

  return filesWherePathIsNotFound;
};

module.exports = function pathLocalizator(path, locales) {
  const translations = getTranslations(locales);

  const filesWherePathIsNotFound = checkPathInTranslation(translations, path);

  if (!_.isEmpty(filesWherePathIsNotFound)) {
    return {
      error: `${path} was not found in the following locale(s): ${filesWherePathIsNotFound.join(',')}`,
    };
  }

  return {};
};
