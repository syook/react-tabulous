import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactTabulous from './containers/table/indexFunctionalComponent';
import { Icon } from 'semantic-ui-react';
import Pagination from './components/paginationv2';

export default class App extends React.Component {
  //you can manipulate this component for testing
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      data: [
        {
          id: 1,
          name: 'Harsh Singh',
          is_completed: true,
          description: 'Dev',
          isDeleted: false,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T01:49:01.920Z',
          joinDate: 'Fri, 01 Nov 2022',
        },
        {
          id: 2,
          name: 'Prakash Barik',
          is_completed: false,
          description: 'QA',
          isDeleted: true,
          age: 22,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T02:49:02.920Z',
          joinDate: 'Fri, 02 Nov 2022',
        },
        {
          id: 3,
          name: 'Muhammad Anees',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T03:03:03.920Z',
          joinDate: 'Fri, 03 Nov 2022',
        },
        {
          id: 4,
          name: 'Mayank Khajanchi',
          is_completed: false,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-04T04:04:04.920Z',
          joinDate: 'Fri, 04 Nov 2022',
        },
        {
          id: 5,
          name: 'Deepak Jena',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T05:05:05.920Z',
          joinDate: 'Fri, 05 Nov 2022',
        },
        {
          id: 6,
          name: 'Harsh Singh',
          is_completed: true,
          description: 'Dev',
          isDeleted: false,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T06:06:06.920Z',
          joinDate: 'Fri, 06 Nov 2022',
        },
        {
          id: 7,
          name: 'Prakash Barik',
          is_completed: false,
          description: 'QA',
          isDeleted: true,
          age: 22,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T07:07:07.920Z',
          joinDate: 'Fri, 07 Nov 2022',
        },
        {
          id: 8,
          name: 'Muhammad Anees',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T08:08:08.920Z',
          joinDate: 'Fri, 08 Nov 2022',
        },
        {
          id: 9,
          name: 'Mayank Khajanchi',
          is_completed: false,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T09:09:09.920Z',
          joinDate: 'Fri, 09 Nov 2022',
        },
        {
          id: 10,
          name: 'Deepak Jena',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T10:10:10.920Z',
          joinDate: 'Fri, 10 Nov 2022',
        },
        {
          id: 11,
          name: 'Deepak Jena',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T12:12:12.920Z',
          joinDate: 'Fri, 11 Nov 2022',
        },
        {
          id: 12,
          name: 'Harsh Singh',
          is_completed: true,
          description: 'Dev',
          isDeleted: false,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T15:15:15.920Z',
          joinDate: 'Fri, 12 Nov 2022',
        },
        {
          id: 13,
          name: 'Prakash Barik',
          is_completed: false,
          description: 'QA',
          isDeleted: true,
          age: 22,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T18:18:18.920Z',
          joinDate: 'Fri, 13 Nov 2022',
        },
        {
          id: 14,
          name: 'Muhammad Anees',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T25:25:25.920Z',
          joinDate: 'Fri, 14 Nov 2022',
        },
        {
          id: 15,
          name: 'Mayank Khajanchi',
          is_completed: false,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T28:28:28.920Z',
          joinDate: 'Fri, 15 Nov 2022',
        },
        {
          id: 16,
          name: 'Deepak Jena',
          is_completed: true,
          description: 'Dev',
          isDeleted: true,
          age: 24,
          gender: 'male',
          origin: 'IN',
          passport: 'Yes',
          timestamp: '2022-11-17T32:32:30.920Z',
          joinDate: 'Fri, 16 Nov 2022',
        },
      ],
    };
  }
  onDelete = ids => {
    console.log('onDelete', ids);
  };

  onShow = rowObject => {
    console.log('onShow', rowObject);
  };

  onEdit = rowObject => {
    console.log('onEdit', rowObject);
  };

  // componentDidMount() {
  //   this.setState({ count: 16 });
  // }

  onInputChange = ({ rowObject, value: newValue }) => {
    const obj = this.state.data.find(item => item.id === rowObject.id);
    obj.name = newValue;
    // this.setState(prev => {
    //   return {
    //     data: [...prev.data.filter(item => item.id !== rowObject.id), obj],
    //   };
    // });
  };

  columnDefs = [
    {
      headerName: 'Name',
      field: rowData => rowData.name,
      type: 'String',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      type: 'String',
      cell: rowObject => rowObject.description,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Gender',
      field: 'gender',
      type: 'String',
      cell: rowObject => rowObject.gender,
      isSortable: false,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Joining Date',
      field: 'joinDate',
      type: 'Date',
      cell: rowObject => rowObject.joinDate,
      isSortable: false,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Login Time',
      field: 'timestamp',
      type: 'DateTime',
      cell: rowObject => rowObject.timestamp,
      isSortable: false,
      isSearchable: true,
      isFilterable: true,
      isResizable: true,
    },
    {
      headerName: 'Age',
      field: 'age',
      type: 'Number',
      cell: rowObject => rowObject.age,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      isResizable: false,
    },
  ];

  updatingObjectId = () => false;

  actionDefs = [
    {
      name: 'Show',
      isVisible: _rowObject => true,
      isDisabled: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      isLoading: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      function: this.onShow,
      icon: 'eye',
      color: '#85C1E9',
    },
    {
      name: 'Delete',
      isVisible: rowObject => !rowObject.isDeleted,
      isDisabled: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      isLoading: rowObject => this.updatingObjectId === (rowObject['id'] || rowObject['_id']),
      function: rowObject => this.onDelete(rowObject),
      icon: 'trash',
      color: '#E8515D',
    },
  ];
  showIcon = row => {
    return <Icon name="angle right"></Icon>;
  };

  getBulkActionState = data => {
    console.log(data);
  };

  // componentDidMount() {
  //   this.setState({
  //     data: [
  //       { id: 1, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false },
  //       { id: 2, name: 'Prakash Barik', description: 'QA', isDeleted: true },
  //     ],
  //   });
  // }
  showCheckbox = workOrder => {
    return !workOrder.is_completed;
  };
  render() {
    return (
      <div>
        <ReactTabulous
          data={this.state.data}
          columnDefs={this.columnDefs}
          actionDefs={this.actionDefs}
          showCheckbox={row => this.showCheckbox(row)}
          showBulkActions={true}
          bulkActionDefs={[
            { name: 'Delete', function: selectedRows => console.log('bulkAction Single action', selectedRows) },
          ]}
          // count={20}
          // showIcon={this.showIcon}
          // key={props.workOrderableFilter + props.woType + props.workOrderCount}
          includeAction
          // count={props.name === 'showPageTable' ? null : props.count}
          mandatoryFields={['Name']}
          tableScroll={false}
          tableName={''}
          // enableIcon={true}
          // fetchOnPageChange={(pageNumber, search, searchKeys, rowsPerPage, sortParams) => {
          //   //do something here , like fetch the data from backend.
          //   this.setState({ data: this.state.data });
          //   console.log('heyy');
          // }}
          // showIcon={row => this.showIcon(row)}
          isShowSerialNumber
          getSelectedOrUnselectedId={(check, id) => {
            console.log(check, id, 'checked value for particular row for the bulkAction');
          }}
          getBulkActionState={this.getBulkActionState}
          hideBulkCount={true}
          // defaultItemsToDisplay={16}
          // emptyCellPlaceHolder="N/A"
          // resetFilterOnDataChange={false}
          // resetHideColumnsOnDataChange={false}
          customPagination={Pagination}
          paginationPositionTop={true}
          showSearch={false}
        />
      </div>
    );
  }
}
