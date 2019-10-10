const filterPredicates = ['And', 'Or'];

const filterOperators = {
  Boolean: ['is'],
  date: ['is', 'is not', 'is before', 'is after', 'is empty', 'is not empty'], //, 'is on or before', 'is on or after'
  Number: ['=', '≠', '<', '>', '≤', '≥', 'is empty', 'is not empty'],
  SingleSelect: ['is', 'is not', 'is any of', 'is none of', 'is empty', 'is not empty'],
  MultiSelect: ['has any of', 'has none of', 'is empty', 'is not empty'],
  String: ['contains', 'does not contains', 'is', 'is not', 'is empty', 'is not empty'],
};

for (const key in filterOperators) {
  filterOperators[key] = filterOperators[key].map(p => ({ value: p, label: p }));
}
export { filterOperators };

export const predicateOptions = filterPredicates.map(p => ({ value: p, label: p }));
