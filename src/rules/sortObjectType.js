const objectTypeAnnotationEvaluator = (context) => {
  const sourceCode = context.getSourceCode();

  return (objectTypeAnnotation) => {
    const keys = objectTypeAnnotation.properties.map((property) => {
      const start = property.start;
      const end = property.value.start;
      return sourceCode.text.substring(start, end);
    });
    console.log(keys);
    keys.forEach((key, index) => {
      if (index !== 0) {
        const previousKey = keys[index - 1];
        if (previousKey > key) {
          context.report({
            data: {
              key,
              previousKey
            },
            fix: null,
            message: 'The key `{{key}}` is not in alphabetical order with `{{previousKey}}`.',
            node: objectTypeAnnotation
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
