import get from 'lodash/get';

export const createPropertyOption = property => option => {
  return {
    value: option[property || 'id' || '_id'],
    label: option[property || 'name'],
  };
};

export const findColumnOptions = (columns, attributeName) => {
  const column = columns.find(c => c.field === attributeName);
  return column.options || [];
};

export const getTableData = (columns, data, placeholder) => {
  const visibleColumns = columns.filter(d => d.isVisible);
  return data.reduce((tableData, dataRecord, index) => {
    const dataObj = {};
    visibleColumns.forEach(column => {
      dataObj['objIndex'] = index;
      dataObj[column.headerName] =
        column.field && typeof column.field === 'function'
          ? column.field(dataRecord)
          : get(dataRecord, column.field) || placeholder;
    });
    tableData.push(dataObj);
    return tableData;
  }, []);
};
