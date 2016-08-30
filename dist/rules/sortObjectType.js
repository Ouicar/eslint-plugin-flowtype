'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var firstKeyText = 'type: ';

var objectTypeAnnotationEvaluator = function objectTypeAnnotationEvaluator(context) {
  var sourceCode = context.getSourceCode();

  return function (objectTypeAnnotation) {
    var properties = objectTypeAnnotation.properties.map(function (property) {
      var start = property.start;
      var end = property.value.start;
      return {
        keyText: sourceCode.text.substring(start, end),
        node: property
      };
    });
    properties.forEach(function (property, index) {
      if (index !== 0) {
        var previousProperty = properties[index - 1];
        if (property.keyText === firstKeyText) {
          context.report({
            data: {
              key: property.keyText
            },
            fix: null,
            message: 'The key `{{key}}` should be the first one.',
            node: property.node
          });
        } else if (previousProperty.keyText > property.keyText && previousProperty.keyText !== firstKeyText) {
          context.report({
            data: {
              key: property.keyText,
              previousKey: previousProperty.keyText
            },
            fix: null,
            message: 'The key `{{key}}` is not in alphabetical order with `{{previousKey}}`.',
            node: property.node
          });
        }
      }
    });
  };
};

exports.default = function (context) {
  return {
    ObjectTypeAnnotation: objectTypeAnnotationEvaluator(context)
  };
};

module.exports = exports['default'];