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

export const getTableData = (columns, data, placeholder) => {
  const visibleColumns = columns.filter(d => d.isVisible);
  return data.reduce((tableData, dataRecord) => {
    const dataObj = {};
    visibleColumns.forEach((column, index) => {
      dataObj['obj'] = dataRecord;
      dataObj[column.headerName] = column.value ? column.value(dataRecord) : placeholder;
    });
    tableData.push(dataObj);
    return tableData;
  }, []);
};
