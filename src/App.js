// import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactTabulous from './containers/table';
import { Input } from 'semantic-ui-react';
export default class App extends React.Component {
  //you can manipulate this component for testing
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      data: [
        { id: 1, name: 'Harsh Singh', is_completed: true, description: 'something', isDeleted: false },
        { id: 2, name: 'Harsh Singh', description: '', isDeleted: true },
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

  componentDidMount() {
    this.setState({ count: 16 });
  }

  onInputChange = ({ rowObject, value: newValue }) => {
    const obj = this.state.data.find(item => item.id === rowObject.id);
    obj.name = newValue;
    this.setState(prev => {
      return {
        data: [...prev.data.filter(item => item.id !== rowObject.id), obj],
      };
    });
    console.log({ rowObject, newValue });
  };
  columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      type: 'String',
      cell: rowObject => (
        <Input value={rowObject.name} onChange={(_e, { value }) => this.onInputChange({ value, rowObject })} />
      ),
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
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
    return <i>icon</i>;
  };

  getbulkactionState = data => {
    console.log(data);
  };

  render() {
    return (
      <div>
        <ReactTabulous
          data={this.state.data}
          count={this.state.count}
          fetchOnPageChange={page => {
            console.log(page);
          }}
          columnDefs={this.columnDefs}
          actionDefs={this.actionDefs}
          includeAction={true}
          showBulkActions={true}
          bulkActionDefs={[{ name: 'Delete', function: () => null }]}
          mandatoryFields={['Name']}
          name={'Table Name'}
          showIcon={this.showIcon}
          getbulkactionState={this.getbulkactionState}
          getSelectedOrUnselectedId={(c, i) => {
            console.log(c, i, 'hey');
          }}
          enableIcon={true}
          isShowSerialNumber
          isAllowDeepSearch
        />
      </div>
    );
  }
}
