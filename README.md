# Syook-Table 🎉

```js
import Table from 'syook-table-v5';

...

tableConfig = [
  {
    heading: 'Name',
    column: 'name',
    type: 'String',
    cell: ({ row }) => row.name,
    isSortable: true,
    isSearchable: true,
  },
  {
    heading: 'Description',
    column: 'description',
    type: 'String',
    cell: ({ row }) => row.description,
    isSortable: true,
    isSearchable: true,
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
    cell: ({ row }) => row.createdAt,
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
