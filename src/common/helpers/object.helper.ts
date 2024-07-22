export const getKeyByValue = (
  object: { [key: string | number]: any },
  value,
): any => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const compareObjects = <T extends object>(objA: T, objB: T): boolean => {
  if (!checkIsObject(objA) || !checkIsObject(objB)) return false;
  const orderObject = (unordered: object) => {
    Object.keys(unordered)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
      }, {});
  };
  const orderedA = orderObject(objA);
  const orderedB = orderObject(objB);
  return JSON.stringify(orderedA) == JSON.stringify(orderedB);
};

export const checkIsObject = (val: any): boolean => {
  return typeof val === 'object' && !Array.isArray(val) && val !== null;
};

// removes all undefined values
export const getObjectWithDefinedValues = <T>(obj: T): T => {
  if (!checkIsObject(obj)) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((arrElement) => {
      getObjectWithDefinedValues<T>(arrElement);
    }) as T;
  }
  // как я понял, entries даёт не ссылки на значения, а значения
  for (const [key, value] of Object.entries(obj)) {
    if (checkIsObject(value) || Array.isArray(value)) {
      obj[key] = getObjectWithDefinedValues<typeof value>(value);
    }
    if (checkIsObject(value) && !Object.keys(value).length) {
      delete obj[key];
    }
  }
  Object.keys(obj)
    .filter((key) => obj[key] === undefined)
    .forEach((key) => {
      delete obj[key];
    });
  return obj;
};

export const assignPartialObjects = (
  target: object,
  source: object,
): { [key: string]: any } => {
  return Object.assign(target || {}, getObjectWithDefinedValues(source));
};

export const filterObjectByKeys = <T>(
  object: T,
  ...allowed: (string | number)[]
): T => {
  allowed = allowed.map((key) => String(key));
  return Object.keys(object)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {}) as T;
};
