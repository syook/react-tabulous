import './App.css';

import React from 'react';

import {
  // dataSet1Columns,
  // dataSet1,
  // getDataSetBasedOnCountPassed
  dataSet2,
  dataSet2Columns
  // getDataSetBasedOnCountPassed,
} from './data';
import { FilterFieldProps, ReactTabulous } from './reactTabulous';
import { Button } from './reactTabulous/components/widgets';

// const filters: FilterFieldProps[] = [
//   {
//     condition: 'And',
//     column: 'Address',
//     operator: 'contains',
//     value: 'Karnataka'
//   },
//   {
//     condition: 'And',
//     column: 'Level',
//     operator: 'is',
//     value: '1'
//   },
//   {
//     condition: 'And',
//     column: 'Birth Date',
//     operator: 'is',
//     value: '2025-04-01'
//   },
//   {
//     condition: 'And',
//     column: 'ID',
//     operator: '=',
//     value: '1281'
//   },
//   {
//     condition: 'And',
//     column: 'Last Journal Publish Date',
//     operator: 'is before',
//     value: '2025-04-29T10:33'
//   },
//   {
//     condition: 'And',
//     column: 'Logged In',
//     operator: 'is',
//     value: 'true'
//   }
// ];

const filters: FilterFieldProps[] = [];

const App: React.FC = () => {
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [newData, setNewData] = React.useState(getDataSetBasedOnCountPassed(25));
  // const [rowsCount, setRowsCount] = React.useState(300);

  // const fetchOnPageChange = (
  // 	page: number,
  // 	pageSize: number,
  // 	searchText: string,
  // 	sort: string,
  // 	sortDirection: GridSortDirection
  // ) => {
  // 	console.log('fetchOnPageChange', page, pageSize, searchText, sort, sortDirection);
  // 	setIsLoading(true);
  // 	setTimeout(() => {
  // 		const updatedData = getDataSetBasedOnCountPassed(50);
  // 		setNewData(updatedData);
  // 		setIsLoading(false);
  // 	}, 2000);
  // };

  const onFilterChange = (filters: FilterFieldProps[]) => {
    console.log('Filter data', filters);
  };

  const customComponent = React.useCallback((filteredAndSortedData: any, searchText: string, columns: any) => {
    return (
      <div>
        <Button
          onClick={() => {
            console.log('Button clicked', filteredAndSortedData, searchText, columns);
          }}
        >
          Create New User
        </Button>
      </div>
    );
  }, []);

  // const customExport = React.useCallback(
  // 	(filteredAndSortedData: any, searchText: string, columns: any) => {
  // 		console.log('Export clicked', filteredAndSortedData, searchText, columns);
  // 	},
  // 	[]
  // );

  return (
    <div className="AppContainer">
      <ReactTabulous
        data={dataSet2}
        columns={dataSet2Columns}
        // data={NfcData}
        // columns={columnDefs}
        // data={newData}
        // columns={dataSet1Columns}
        emptyPlaceholder="N/A"
        checkboxSelection
        // loading
        noRowsOverlay={<NoRowsOverlay />}
        // hidePagination
        // hideFooterRowCount
        // disableColumnReorder
        // disableColumnResize
        // disableColumnPinning
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        // disableColumnMenu
        // disableMultipleColumnsSorting
        // disableSearch
        // disableColumnExport
        // bulkActions={[
        // 	{
        // 		label: 'Delete',
        // 		onClick: selectedRows => {
        // 			console.log('Delete', selectedRows);
        // 		}
        // 	},
        // 	{
        // 		label: 'Edit',
        // 		onClick: selectedRows => {
        // 			console.log('Edit', selectedRows);
        // 		}
        // 	}
        // ]}
        defaultPageSize={50}
        bulkActions={['delete', 'edit']}
        onBulkActionClick={(action, selectedRows, resetSelectedRows) => {
          console.log(action, selectedRows, resetSelectedRows);
        }}
        // fetchOnPageChange={fetchOnPageChange}
        // rowsCount={rowsCount}
        // customExport={customExport}
        filters={filters}
        onFilterChange={onFilterChange}
      >
        {customComponent}
      </ReactTabulous>
    </div>
  );
};

export default App;

const NoRowsOverlay = () => {
  return (
    <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden="true" focusable="false">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(24 31.67)">
          <ellipse fill="rgb(245, 245, 245)" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse>
          <path
            fill="rgb(174, 184, 194)"
            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
          ></path>
          <path
            fill="rgb(245, 245, 247)"
            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
          ></path>
          <path
            fill="rgb(220, 224, 230)"
            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
          ></path>
        </g>
        <path
          fill="rgb(220, 224, 230)"
          d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
        ></path>
        <g fill="rgb(255, 255, 255)" transform="translate(149.65 15.383)">
          <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
          <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
        </g>
      </g>
    </svg>
  );
};
