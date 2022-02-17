import get from 'lodash/get';

export const createPropertyOption = property => option => {
  return {
    value: option[property || 'id' || '_id'],
    label: option[property || 'name'],
  };
};

export const findColumnOptions = (columns, attributeName) => {
  const column = columns.find(c => c.headerName === attributeName);
  return column.options || [];
};

export const getTableData = (columns, data, placeholder) => {
  const visibleColumns = columns.filter(d => d.isVisible);
  return data.reduce((tableData, dataRecord, index) => {
    const dataObj = {};
    if ('_id' in dataRecord) dataObj['_id'] = dataRecord._id;
    if ('id' in dataRecord) dataObj['id'] = dataRecord.id;
    visibleColumns.forEach(column => {
      dataObj['objIndex'] = index;
      dataObj[column.headerName] =
        column.field && typeof column.field === 'function'
          ? column.field(dataRecord)
          : get(dataRecord, column.field) || '';
    });
    tableData.push(dataObj);
    return tableData;
  }, []);
};

export const getFilteredTableData = (filteredData, data) => {
  return filteredData.reduce((filteredOriginalData, rowObject) => {
    filteredOriginalData.push(data[rowObject.objIndex]);
    return filteredOriginalData;
  }, []);
};

export const getTableColumns = (columnDefs = []) => {
  return columnDefs.reduce(
    (tableColumnDefs, columnDef) => {
      let updatedColumnDef = { ...columnDef };
      if (updatedColumnDef.omitInHideList !== true) {
        if (updatedColumnDef.isSearchable && updatedColumnDef.headerName) {
          tableColumnDefs.searchKeys[columnDef.headerName] = true;
        }
        updatedColumnDef.isVisible = true;
        tableColumnDefs.columnDefs.push(updatedColumnDef);
      }
      return tableColumnDefs;
    },
    { columnDefs: [], searchKeys: {} }
  );
};

export const formatText = text => {
  return text.replace(/[^a-zA-Z0-9]/g, '');
};
