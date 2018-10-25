const pathLocalizator = require('./src/path-localizator');

const runRule = (path, locales, context, node) => {
  const result = pathLocalizator(path, locales);

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

    return {
      ExpressionStatement(node) {
        if (node.expression.callee.name === translationFunctionName) {
          translateFirstArgument = node.expression.arguments[0] && node.expression.arguments[0].value;

          runRule(translateFirstArgument, localesPath, context, node);
        }
      },
      MemberExpression(node) {
        if (node.object.name === translationFunctionName) {
          translateFirstArgument = node.parent.arguments[0] && node.parent.arguments[0].value;

          runRule(translateFirstArgument, localesPath, context, node);
        }
      },
    }
  },
}
