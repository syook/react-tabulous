// This file is going to help us create a slice for the data that the tabulous rendering component is supposed to store
import { createSlice } from '@reduxjs/toolkit';

const tabulousSlice = createSlice({
  name: 'tabulous',
  initialState: {
    columns: [], //columnAndKeys.columnDefs
    bulkSelect: false,
    indeterminateSelect: false,
    selectedRows: [],
    searchKeys: [], //columnAndKeys.searchKeys
    hiddenColumns: [], //columnAndKeys.columnDefs.filter(c => !props.mandatoryFields.includes(c.headerName)),
    data: [], //getTableData(columnAndKeys.columnDefs, [...props.data]),
    rawData: [], //props.data,
    stylesForTable: {},
    resetStylesForTable: {},
    showResetButton: true, //props.showResetButton && columnAndKeys.columnDefs.some(c => c.isResizable),
  },
  reducers: {
    updateColumns(state, action) {
      state.columns = [...(action.payload.col || [])];
    },
    updateData(state, action) {
      state.data = [...(action.payload.data || [])];
    },
    updateRawData(state, action) {
      state.rawData = action.payload.rawData;
    },
    updateSearchKeys(state, action) {
      state.searchKeys = action.payload.searchKeys;
    },
    updateBulkSelect(state, action) {
      state.bulkSelect = action.payload.bulkSelect;
    },
    updateSelectedRows(state, action) {
      state.selectedRows = [[...(action.payload.selectedRows || [])]];
    },
    updateIndeterminateSelect(state, action) {
      state.indeterminateSelect = action.payload.indeterminateSelect;
    },
    eraseStylesForTable(state) {
      state.stylesForTable = {};
    },
    updateStylesForTable(state, action) {
      state.stylesForTable = { ...state.stylesForTable, ...action.payload.stylesForTable };
    },
    updateHiddenColumns(state, action) {
      state.hiddenColumns = [...(action.payload.hiddenColumns || [])];
    },
    updateResetStylesForTable(state, action) {
      state.resetStylesForTable = { ...state.resetStylesForTable, ...action.payload.style };
    },
  },
});

export const tabulousActions = tabulousSlice.actions;

export default tabulousSlice;
