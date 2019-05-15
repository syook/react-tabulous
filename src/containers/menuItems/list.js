import './list.css';
import React, { Component } from 'react';
import format from 'date-fns/format';
import { Button, Input } from 'semantic-ui-react';

import TableComponent from '../table';

class MenuItemList extends Component {
  state = { data: [] };

  async componentDidMount() {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      // const baseUrl = 'http://localhost:5000';
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/menuItems`);
        const { data } = await response.json();
        if ((data || []).length) {
          this.setState({ data });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  onDelete = ids => {
    console.log('onDelete', ids);
  };

  onShow = args => {
    console.log('onShow', args);
  };

  onEdit = args => {
    console.log('onEdit', args);
  };

  onInputChange = ({ rowObject, value: newValue }) => {
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
      // isResizable: true,
    },
    {
      headerName: 'Category',
      field: 'category',
      type: 'SingleSelect',
      cell: rowObject => rowObject.category,
      options: ['Grocery', 'Electronics', 'Home', 'Shoes', 'Computers', 'Outdoors', 'Clothing'].map(category => ({
        value: category,
        label: category,
      })),
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    {
      headerName: 'Price',
      field: 'price',
      type: 'Number',
      cell: rowObject => rowObject.price,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      // isResizable: true,
    },
    {
      headerName: 'Expertise',
      field: 'isExpertised',
      type: 'Boolean',
      cell: rowObject => (rowObject.isExpertised ? 'Yes' : 'No'),
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
    {
      headerName: 'Availability',
      field: 'availability',
      type: 'MultiSelect',
      cell: rowObject => rowObject.availability.join(', '),
      options: ['Yes', 'No', 'Maybe'].map(a => ({ value: a, label: a })),
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
    {
      headerName: 'Started at',
      field: 'created',
      cell: rowObject => format(new Date(rowObject.created), 'dd-MMM-yyyy hh:mm a'),
      type: 'Date',
      isSortable: true,
      isSearchable: false,
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

  bulkActionDefs = [{ action: 'delete', function: this.onDelete }];

  customComponents = () => (
    <>
      <Button disabled size="small" onClick={() => null}>
        Button 1
      </Button>
      {/* <Button onClick={() => null}>Button 2</Button> */}
    </>
  );

  render() {
    return (
      <>
        <TableComponent
          actionDefs={this.actionDefs}
          bulkActionDefs={this.bulkActionDefs}
          columnDefs={this.columnDefs}
          data={this.state.data || []}
          includeAction={true}
          mandatoryFields={['Name']}
          name={'Table Name'}
        />
      </>
    );
  }
}

export default MenuItemList;
