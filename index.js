const PathLocator = require('./src/path-locator');

const runRule = (path, pathLocator, context, node) => {
  const result = pathLocator.call(path);

  if (result.error) {
    context.report({
      node,
      message: result.error,
    });
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'Check if all localization strings are defined in locales folder',
      category: 'i18n',
      recommended: true,
    },
    schema: [{
      type: 'object',
      properties: {
        localesPath: {
          type: 'array',
          items: {
            type: 'string'
          },
        },
        translationFunctionName: {
          type: 'string'
        },
      },
      required: [ 'localesPath' ],
      additionalProperties: false
    }]
  },
  create(context) {
    const { options } = context;
    let { localesPath, translationFunctionName } = options[0] || {};

    translationFunctionName = translationFunctionName || 'translate';

    const pathLocator = new PathLocator(localesPath);

    return {
      ExpressionStatement(node) {
        if (node.expression.callee.name !== translationFunctionName) {
          return;
        }

        const translateFirstArgument = node.expression.arguments[0] && node.expression.arguments[0].value;

        if (translateFirstArgument) {
          runRule(translateFirstArgument, pathLocator, context, node);
        }
      },
      MemberExpression(node) {
        if (node.object.name !== translationFunctionName) {
          return;
        }

        const translateFirstArgument = node.parent.arguments[0] && node.parent.arguments[0].value;

        if (translateFirstArgument) {
          runRule(translateFirstArgument, pathLocator, context, node);
        }
      },
    }
  },
}
