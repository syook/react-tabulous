export const createPropertyOption = (valueProperty, labelProperty) => option => {
  return {
    value: option[valueProperty || 'id' || '_id'],
    label: option[labelProperty || 'name'],
  };
};

export const findColumnOptions = (columns, attributeName) => {
  const column = columns.find(c => c.field === attributeName);
  return column.options || [];
};
