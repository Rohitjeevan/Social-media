function extractErrorAttributes(errors) {
    const errorAttributes = [];
    for (const serviceName in errors) {
      if (Object.hasOwnProperty.call(errors, serviceName)) {
        const serviceErrors = errors[serviceName];
        for (const errAttr in serviceErrors) {
          if (Object.hasOwnProperty.call(serviceErrors, errAttr)) {
            errorAttributes.push(errAttr);
          }
        }
      }
    }
    return errorAttributes;
  }
  
export {extractErrorAttributes}