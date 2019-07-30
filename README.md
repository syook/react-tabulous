# Syook-Table 🎉

```js
import Table from 'syook-table-v5';
import moment from 'moment';

...

tableConfig = [
  {
    heading: 'Name',
    column: 'name',
    type: 'String',
    cell: ({ row }) => row.name,
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Description',
    column: 'description',
    type: 'String',
    cell: ({ row }) => row.description,
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Category',
    column: 'category',
    type: 'Select',
    cell: ({ row }) => row.category,
    options: [{ value: 'Electrical', label: 'Electrical' }, { value: 'Mechanical', label: 'Mechanical' }],
    isSortable: true,
    isSearchable: true,
    isFilterable: true,
  },
  {
    heading: 'Availability',
    column: 'availability',
    type: 'Boolean'
    cell: ({ row }) => row.availability ? 'Yes' : 'No',
    isSortable: true,
    isSearchable: true,
  },
  {
    heading: 'Created at',
    column: 'createdAt',
    type: 'Date'
    cell: ({ row }) => moment(row.createdAt).formatOf('DD-MMM-YYYY hh:mm A'),
    isSortable: true,
    isSearchable: true,
  }
];

actionConfig = [
  {
    action: 'Show',
    function: this.onShow,
    icon: 'eye',
    show: _row => true,
  },
  {
    action: 'Edit',
    function: this.onShow,
    icon: 'pencil',
    show: _row => true,
  },
  {
    action: 'Delete',
    show: _row => true,
    function: this.onDelete,
    icon: 'trash',
  },
];

...

<Table
  actionConfig={actionConfig}
  bulkActions={[{ action: 'delete', function: onDelete }]}
  data={this.props.objects}
  includeAction={true}
  mandatoryFields={['Name']}
  name='Menu Items'
  records={tableConfig}
/>

...
```

Available Column Options 

| Command | Description |
| --- | --- |
| `headerName` | Name of Column to be shown in header |
| `field` | field name as in the data |
| `type` | type of the field |
| `cell` | function, which returns the value to be shown in the column cell|
| `isSortable` | boolean if the column is sortable|
| `isSearchable` | boolean if the column is searchable|
| `isFilterable` | boolean if the column is filterable|
