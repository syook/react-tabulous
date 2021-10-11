import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactTabulous from './containers/table/indexFunctionalComponent';
import { Icon } from 'semantic-ui-react';

export default class App extends React.Component {
  //you can manipulate this component for testing
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      data: [
        { id: 1, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false },
        { id: 2, name: 'Prakash Barik', is_completed: false, description: 'QA', isDeleted: true },
        { id: 3, name: 'Muhammad Anees', is_completed: true, description: 'Dev', isDeleted: true },
        { id: 4, name: 'Mayank Khajanchi', is_completed: false, description: 'Dev', isDeleted: true },
        { id: 5, name: 'Deepak Jena', is_completed: true, description: 'Dev', isDeleted: true },
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
          // emptyCellPlaceHolder="N/A"
          // resetFilterOnDataChange={false}
          // resetHideColumnsOnDataChange={false}
        />
      </div>
    );
  }
}
