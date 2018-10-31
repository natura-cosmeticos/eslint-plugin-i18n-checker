const _ = require('lodash');
const fs = require('fs');

class PathLocator {
  constructor(localesPath, messagesBasePath) {
    this.translations = this.getTranslations(localesPath);
    this.messagesBasePath = messagesBasePath;
  }

  getTranslations(localesPath = '/locales/') {
    const translations = [];
    const localesFullPath = `${process.cwd()}/${localesPath}`;
    const localesFiles = fs.readdirSync(localesFullPath).map(file => file);

    localesFiles.forEach((localeFile) => {
      // TODO handle when file is not found
      translations.push({
        file: localeFile,
        messages: require(`${localesFullPath}${localeFile}`), // eslint-disable-line
      });
    });

    return translations;
  }

  checkPathInTranslation(path) {
    const filesWherePathIsNotFound = [];
    let pathToFind = path;

    if (this.messagesBasePath) {
      pathToFind = `${this.messagesBasePath}.${path}`;
    }

    this.translations.forEach(({ messages, file }) => {
      const localizedString = _.get(messages, pathToFind);

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
