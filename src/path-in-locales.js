const PathLocator = require('./path-locator');

class PathInLocalesRunner {
  constructor(context, options) {
    const { localesPath, messagesBasePath, translationFunctionName } = options;

    this.context = context;
    this.translationFunctionName = translationFunctionName;
    this.pathLocator = new PathLocator(localesPath, messagesBasePath);
  }

  runRule(path, node) {
    const result = this.pathLocator.call(path);

    if (result.error) {
      this.context.report({
        message: result.error,
        node,
      });
    }
  }

  memberExpression(node) {
    if (node.object.name !== this.translationFunctionName) {
      return;
    }

    const path = node.parent.arguments[0] && node.parent.arguments[0].value;

    if (path) {
      this.runRule(path, node);
    }
  }

  literal(node) {
    const { parent } = node;

    if (parent && parent.callee && parent.callee.name === this.translationFunctionName) {
      this.runRule(node.value, node);
    }
  }

  call() {
    return {
      Literal: this.literal.bind(this),
      MemberExpression: this.memberExpression.bind(this),
    };
  }
}

const getOptions = (options) => {
  const { localesPath, messagesBasePath } = options[0] || {};

  let { translationFunctionName } = options[0] || {};

  translationFunctionName = translationFunctionName || 'translate';

  return {
    localesPath,
    messagesBasePath,
    translationFunctionName,
  };
};

module.exports = {
  create: function pathInLocales(context) {
    const pathInLocalesRunner = new PathInLocalesRunner(context, getOptions(context.options));

    return pathInLocalesRunner.call();
  },
  meta: {
    docs: {
      category: 'i18n',
      description: 'Check if all localization strings are defined in locales folder',
      recommended: true,
    },
    schema: [{
      additionalProperties: false,
      properties: {
        localesPath: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        messagesBasePath: {
          type: 'string',
        },
        translationFunctionName: {
          type: 'string',
        },
      },
      required: ['localesPath'],
      type: 'object',
    }],
  },
};
