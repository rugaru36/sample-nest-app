import { ValidationError } from 'class-validator';
import { checkIsObject } from './object.helper';

type ConstraintsType = { [key: string]: string };

type ParsedValidationErrorType = {
  children?: ParsedValidationErrorType[];
  field: string;
  value?: any;
  constraints?: ConstraintsType;
};

export const getErrorMessagesFromParsedValidationError = (
  parsedError: ParsedValidationErrorType,
): string[] => {
  const messages: string[] = [];
  const processParsedError = (field: string, constraints: ConstraintsType) => {
    if (!constraints) {
      messages.push(`${field}: invalid value`);
    } else if (checkIsObject(constraints)) {
      for (const [key, value] of Object.entries(constraints)) {
        messages.push(`${field} ${key}: ${value}`);
      }
    }
  };
  const processParsedErrorChildren = (
    errorsChildren: ParsedValidationErrorType[],
    pathPrefix = '',
  ): void => {
    for (const child of errorsChildren) {
      const childField = child.field;
      const childFieldWithSeparator = isNaN(+childField)
        ? `.${childField}`
        : `[${childField}]`;
      const childFieldWithPrefix = `${pathPrefix}${childFieldWithSeparator}`;
      if (child.children) {
        processParsedErrorChildren(child.children, childFieldWithPrefix);
      } else {
        processParsedError(childFieldWithPrefix, child.constraints);
      }
    }
  };
  if (!parsedError.children) {
    processParsedError(parsedError.field, parsedError.constraints);
  } else if (parsedError.children) {
    processParsedErrorChildren(parsedError.children, parsedError.field);
  }
  return messages;
};

export const parseValidationError = (
  error: ValidationError,
): ParsedValidationErrorType => {
  try {
    const result: ParsedValidationErrorType = {
      field: error.property,
    };
    if (error.children?.length) {
      result.children = error.children.map(parseValidationError);
    } else if (!error.children?.length) {
      if (error.target) result.value = error.target[error.property];
    }
    if (error.constraints) result.constraints = error.constraints;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};
