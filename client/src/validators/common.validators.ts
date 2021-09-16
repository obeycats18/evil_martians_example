export const isRequired = <V extends string>(value: V) => {
  return Boolean(value.length);
};

export const isContainsDigital = <V extends string>(value: V) => {
  return Boolean(value.match(/\d/gi));
};

export const isContainsLetter = <V extends string>(value: V) => {
  return !isContainsDigital(value);
};

export const isMoreThen = <V extends string>(value: V, then: number) => {
  return value.length >= then;
};
