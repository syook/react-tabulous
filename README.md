# React-Tabulous 🎉

## Installation

To use in your own project, install it via npm package.

`npm i react-tabulous`

Or you can clone and build it.

`git clone git@github.com:syook/react-tabulous.git`

`npm run build`

The files will be under `./lib` folder.

## Options

### a. Available Column Options

| Option           | Description                                                  | Type     | isRequired | Default |
| ---------------- | ------------------------------------------------------------ | -------- | ---------- | ------- |
| `headerName`     | Name of Column to be shown in header                         | String   | true       |
| `field`          | field name as in the data                                    | String   | true       |
| `type`           | type of the field                                            | String   | true       |
| `cell`           | returns the value to be shown in the column cell             | Function | true       |
| `isSortable`     | is column sortable                                           | Boolean  | false      |
| `isSearchable`   | is column searchable                                         | Boolean  | false      |
| `isFilterable`   | is column filterable                                         | Boolean  | false      |
| `omitInHideList` | should the column be omitted in table and show/hide dropdown | Boolean  | false      |
| `options`        | array of options if the type is MultiSelect or Single Select | Array    | false      | []      |

### b. Action Config Options : actions will be shown in action column in table

| Option               | Description                                                             | Type     |
| -------------------- | ----------------------------------------------------------------------- | -------- |
| `isVisible`          | Function which returns if the action is visible or not                  | Function |
| `isDisabled`         | Function which returns if the action is disabled or not                 | Function |
| `function`           | Function to be executed on action event                                 | Function |
| `icon`               | Icon name to represent the action                                       | Function |
| `name`               | Name of action                                                          | string   |
| `color`              | color of action component                                               | string   |
| `iconColor`          | color of icon                                                           | string   |
| `size`               | size of icon                                                            | string   |
| `inverted`           | to enable inverted behaviour of action element                          | function |
| `iconInverted`       | to enable inverted behaviour of icon                                    | boolean  |
| `className`          | any custom classname to be applied for action element                   | string   |
| `iconClassName`      | any custom classname to be applied for icon                             | string   |
| `hasCustomComponent` | if the action is any custom component other than button                 | boolean  |
| `customComponent`    | the component that needs to returned if the action has custom component | function |

### c. Available Types

| Type           | Filter queries available                                        | Extra props needed |
| -------------- | --------------------------------------------------------------- | ------------------ |
| `String`       | contains, does not contains, is, is not, is empty, is not empty |
| `Date`         | is, is not, is after, is before, is empty, is not empty         |
| `Number`       | =, =/ , < , <=, > , >= , is empty, is not empty                 |
| `SingleSelect` | has any of, has none of, is empty, is not empty                 | options: []        |
| `MultiSelect`  | is, is not, is empty, is not empty,                             | options: []        |

## Example

```js
...

import ReactTabulous from 'react-tabulous';
import format from 'date-fns/format'
import { Button, Input } from 'semantic-ui-react';

...

onDelete = ids => {
  console.log('onDelete', ids);
};

onShow = rowObject => {
  console.log('onShow', rowObject);
};

onEdit = rowObject => {
  console.log('onEdit', rowObject);
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
    isResizable: true,
  },
  {
    headerName: 'Category',
    field: 'category',
    type: 'SingleSelect',
    cell: rowObject => rowObject.category,
    options: ['Grocery', 'Electronics', 'Home', 'Shoes', 'Computers', 'Outdoors', 'Clothing'].map((category, index) => ({
      value: index,
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
    isResizable: true,
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
    <Button onClick={() => null}>Button 2</Button>
  </>
);

...

<ReactTabulous
  actionDefs={this.actionDefs}
  bulkActionDefs={this.bulkActionDefs}
  data={this.state.data || []}
  includeAction={true}
  mandatoryFields={['Name']}
  name={'Table Name'}
  columnDefs={this.columnDefs}>
  {this.customComponents}
</ReactTabulous>

...
```

## Contributing Guidelines

Please refer [CONTRIBUTING.md](https://github.com/syook/react-tabulous/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/syook/react-tabulous/blob/master/LICENSE.md)
