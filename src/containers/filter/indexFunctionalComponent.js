/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useCallback } from 'react';
import NoRecords from '../../assets/noRecords';

import FilterV2 from '../../components/filterV2';

import { loopFilters } from './utils';

export const FilterContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'shouldFilterReset':
      return { ...state, shouldFilterReset: action.payload };
    case 'filterDisabled':
      return { ...state, filterDisabled: action.payload };
    case 'data':
      return { ...state, data: [...(action.payload || [])] };
    case 'selectedFilters':
      return { ...state, selectedFilters: [...(action.payload || [])] };
    default:
      return state;
  }
}
function FilterProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    selectedFilters: [],
    data: [...props.data],
    shouldFilterReset: false,
    filterDisabled: false,
  });

  const setSelectedFilters = useCallback(
    selectedFilters => {
      dispatch({ type: 'selectedFilters', payload: selectedFilters });
      dispatch({ type: 'shouldFilterReset', payload: false });
    },
    [state.selectedFilters, state.shouldFilterReset]
  );

  useEffect(() => {
    if (props.resetFilterOnDataChange && !state.shouldFilterReset)
      dispatch({ type: 'shouldFilterReset', payload: true });
    applyFilter(state.selectedFilters);
  }, [props.data, props.columns]);

  useEffect(() => {
    applyFilter(state.selectedFilters);
  }, [state.selectedFilters]);

  const applyFilter = useCallback(
    filters => {
      dispatch({ type: 'filterDisabled', payload: true });
      const selectedFilters = filters && filters.length ? filters : state.selectedFilters;
      const searchedData = props.data || [];
      if (!selectedFilters.length) {
        dispatch({ type: 'filterDisabled', payload: false });
        dispatch({ type: 'data', payload: searchedData });
      } else {
        const filteredData = loopFilters(searchedData, selectedFilters, props.emptyCellPlaceHolder);
        dispatch({ type: 'filterDisabled', payload: false });
        dispatch({ type: 'data', payload: filteredData });
      }
    },
    [state.selectedFilters, props.data, state.filterDisabled]
  );

  const { children, filterableColumns } = props;
  const parentDataCount = (props.data || []).length;
  const stateDataCount = (state.data || []).length;

  return (
    <FilterContext.Provider value={{ rawData: props.rawData, ...state, count: props.count }}>
      <FilterV2
        applyFilter={applyFilter}
        disabled={!parentDataCount || !filterableColumns.length}
        filterDisabled={state.filterDisabled}
        filterableColumns={filterableColumns}
        columns={props.columns}
        selectedFilters={state.selectedFilters}
        setSelectedFilters={setSelectedFilters}
        shouldFilterReset={state.shouldFilterReset}
        accentColor={props.accentColor}
      />
      {children}

      {parentDataCount && !stateDataCount ? (
        <div className="noRecordsDiv">
          <NoRecords />
          <p>No Results Found</p>
        </div>
      ) : null}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
