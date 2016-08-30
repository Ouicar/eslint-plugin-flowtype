const firstKeyText = 'type: ';

const objectTypeAnnotationEvaluator = (context) => {
  const sourceCode = context.getSourceCode();

  return (objectTypeAnnotation) => {
    const properties = objectTypeAnnotation.properties.map((property) => {
      const start = property.start;
      const end = property.value.start;
      return {
        keyText: sourceCode.text.substring(start, end),
        node: property
      };
    });
    properties.forEach((property, index) => {
      if (index !== 0) {
        const previousProperty = properties[index - 1];
        if (property.keyText === firstKeyText) {
          context.report({
            data: {
              key: property.keyText
            },
            fix: null,
            message: 'The key `{{key}}` should be the first one.',
            node: property.node
          });
        }
        else if (previousProperty.keyText > property.keyText &&
          previousProperty.keyText !== firstKeyText) {
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

export default (context) => {
  return {
    ObjectTypeAnnotation: objectTypeAnnotationEvaluator(context)
  };
};
