type ValueType = string | number | boolean;

export interface OptionInterface {
  value: ValueType;
  label: string;
}

export const getLowercase = (string: ValueType) => `${string ?? ''}`.toLowerCase();
export const isStringMatch = (string: ValueType, search: ValueType) => getLowercase(string) === getLowercase(search);
export const isStringIncludes = (string: ValueType, search: ValueType) =>
  getLowercase(string).includes(getLowercase(search));

export const getValueFromOptions = (options: OptionInterface[], value: string | number | boolean) => {
  if (value === undefined || value === null || value === '') return null;

  return options.find(o => isStringMatch(o?.value, value)) || null;
};
