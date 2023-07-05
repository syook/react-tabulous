# React-Tabulous 🎉

## Installation

To use in your own project, install it via npm package.

`npm i @syook/react-tabulous`

Or you can clone.

`git clone git@github.com:syook/react-tabulous.git`

## Options

### a. Available Column Options

| Option         | Description                                                                | Type     | isRequired | Default |
| -------------- | -------------------------------------------------------------------------- | -------- | ---------- | ------- |
| `headerName`   | Name of Column to be shown in header                                       | String   | true       |         |
| `type`         | type of the field                                                          | String   | true       |         |
| `field`        | path to get value to be displayed                                          | String   | true       |         |
| `valueGetter`  | should return string that to be displayed in the cell or used in filter    | Function | false      | null    |
| `renderCell`   | returns the element to be shown in the column cell                         | Function | false      | null    |
| `description`  | shows the description of the column on hover in tooltip                    | String   | false      | ''      |
| `isSortable`   | is column sortable                                                         | Boolean  | false      | false   |
| `isSearchable` | is column searchable                                                       | Boolean  | false      | false   |
| `isFilterable` | is column filterable                                                       | Boolean  | false      | false   |
| `isVisible`    | should hide/show the column or not                                         | Boolean  | false      | true    |
| `options`      | array of options if the type is MultiSelect or Single Select               | Array    | false      | []      |
| `isResizable`  | is column resizable                                                        | Boolean  | false      | false   |
| `pinned`       | String='left' or 'right', where to fix the column                          | String   | false      | null    |
| `width`        | to fix column width to a value in pixels if width exceeding this threshold | Number   | false      | null    |

### c. Available Types

| Type              | Filter queries available                                        | Extra props needed |
| ----------------- | --------------------------------------------------------------- | ------------------ |
| `string`          | contains, does not contains, is, is not, is empty, is not empty |
| `dateTime`/`date` | is, is not, is after, is before, is empty, is not empty         |
| `number`          | =, =/ , < , <=, > , >= , is empty, is not empty                 |
| `singleSelect`    | has any of, has none of, is empty, is not empty                 | options: []        |
| `multiSelect`     | is, is not, is empty, is not empty,                             | options: []        |

### d. Component Props

| Prop                            | Description                                             | Default   | Required | Type                |
| ------------------------------- | ------------------------------------------------------- | --------- | -------- | ------------------- |
| `data`                          | data for the table                                      |           | true     |                     |
| `columns`                       | columns for the table                                   |           |          |                     |
| `emptyPlaceholder`              | placeholder for empty cells                             | ''        | false    | String              |
| `checkboxSelection`             | shows checkbox for bulk actions                         | false     | false    | Boolean             |
| `bulkActions`                   | bulk actions to show when checkbox selected             | []        | false    | String[]            |
| `onBulkActionClick`             | onClick of bulk action                                  | null      | false    | Function            |
| `loading`                       | loading state inside the table                          | false     | false    | Boolean             |
| `defaultPageSize`               | rows per page in the table                              | 10        | false    | Number              |
| `noRowsOverlay`                 | shows when there is no data to display                  | ReactNode | false    | String or ReactNode |
| `density`                       | density of the rows                                     | standard  | false    | string              |
| `hidePagination`                | hides pagination                                        | false     | false    | Boolean             |
| `hideFooterRowCount`            | hides row count in footer                               | false     | false    | Boolean             |
| `hideFooter`                    | hides footer                                            | false     | false    | Boolean             |
| `disableColumnReorder`          | disables column reordering                              | false     | false    | Boolean             |
| `disableColumnResize`           | disables column resizing                                | false     | false    | Boolean             |
| `disableColumnPinning`          | disables column pinning                                 | false     | false    | Boolean             |
| `disableColumnFilter`           | disables column filtering                               | false     | false    | Boolean             |
| `disableColumnSelector`         | disables column show and hiding                         | false     | false    | Boolean             |
| `disableDensitySelector`        | disables changing of row density                        | false     | false    | Boolean             |
| `disableColumnMenu`             | disables showing column menu                            | false     | false    | Boolean             |
| `disableMultipleColumnsSorting` | disables sorting option in each column                  | false     | false    | Boolean             |
| `disableSearch`                 | disables search                                         | false     | false    | Boolean             |
| `disableColumnExport`           | disables column export                                  | false     | false    | Boolean             |
| `fetchOnPageChange`             | page, rows per page or sorting change for paginated API | null      | false    | Function            |
| `rowsCount`                     | shows rows count if it is paginated API                 | false     | false    | Boolean             |
| `customExport`                  | custom export function                                  | null      | false    | Boolean             |

## Example

```js
...

import ReactTabulous from 'react-tabulous';
import { Button, IconButton, Select } from 'commonComponents/widgets';

...

const minAge = 20;
const maxAge = 80;

const workPlaceOptions = ['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

function generateUniqueId(): number {
	const random: number = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
	const id: string = random.toString().padStart(4, '0'); // Convert the random number to a string and ensure that it has exactly 4 digits
	return +id;
}

function getRandomBirthDate(): Date {
	const minYear: number = 1900;
	const minMonth: number = 0;
	const currentYear: number = new Date().getFullYear();
	const currentMonth: number = new Date().getMonth();
	const minDate: Date = new Date(minYear, minMonth, 1);
	const currentDate: Date = new Date(currentYear, currentMonth, 1);
	const diffTime: number = Math.abs(currentDate.getTime() - minDate.getTime());
	const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const randomDays: number = Math.floor(Math.random() * diffDays);
	const randomDate: Date = new Date(minDate);
	randomDate.setDate(minDate.getDate() + randomDays);
	return randomDate;
}

const data = Array.from({ length: 50 }, (_, i) => {
	const id = generateUniqueId();

	return {
		id,
		name: `test${i + 1}`,
		email: `test${i + 1}@test.com`,
		age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge,,
		birthDate: getRandomBirthDate(),
		level: Math.ceil(Math.random() * 3),
		workPlace: workPlaceOptions[Math.floor(Math.random() * workPlaceOptions.length)]
	};
});

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		type: 'number',
		isFilterable: true,
		isSortable: true,
		isSearchable: true
	},
  {
		field: 'name',
		headerName: 'Name',
		type: 'string',
		isFilterable: true,
		isSortable: true,
		isSearchable: true
	},
  {
		field: 'age',
		headerName: 'Age',
		type: 'number',
		isFilterable: true,
		isSortable: true,
		isSearchable: true
	},
	{
		field: 'level',
		headerName: 'Level',
		type: 'string',
		renderCell: (row: any) => {
			const level = row?.level ?? 1;
			const levelText = level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Advanced';
			const levelColor = level === 1 ? 'green' : level === 2 ? 'orange' : 'red';
			return <span style={{ color: levelColor }}>{levelText}</span>;
		},
		isFilterable: true,
		isSortable: true,
		isSearchable: true
	},
	{
		field: 'birthDate',
		headerName: 'Birth Date',
		type: 'date',
		isFilterable: true,
		isSortable: true,
		isSearchable: true
	},
  {
		field: 'email',
		headerName: 'Email Address',
		type: 'string',
		isFilterable: true,
		// isSortable: true,
		isSearchable: true
	},
  {
		field: 'workPlace',
		headerName: 'Work Place',
		type: 'string',
		renderCell: (row: any) => {
			const workPlace = row?.workPlace ?? '';

			const onChange = (event: any) => {
				console.log(event.target.value);
			};

			return <Select value={workPlace} options={workPlaceOptions} onChange={onChange} />;
		}
	},
  {
		field: 'action',
		headerName: 'Action',
		type: 'action',
		renderCell: (row: any) => {
			const onClick = () => {
				alert(JSON.stringify(row, null, 2));
				console.log(row);
			};

			return (
				<div style={{ display: 'flex' }}>
					<IconButton name="add" onClick={onClick} type="transparent" size={16} />
					<IconButton name="close" onClick={onClick} type="transparent" size={16} />
					<Button size="small" variant="contained" onClick={onClick}>
						Click
					</Button>
				</div>
			);
		}
	}
]

const customComponent = React.useCallback(
		(filteredAndSortedData: any, searchText: string, columns: any) => {
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
		},
		[]
	);

...

<ReactTabulous
	data={data}
	columns={columns}
	emptyPlaceholder="N/A"
	checkboxSelection
	noRowsOverlay={<NoRowsOverlay />}
	defaultPageSize={50}
	bulkActions={['delete', 'edit']}
	onBulkActionClick={(action, selectedRows) => {
		console.log(action, selectedRows);
	}}
>
	{customComponent}
</ReactTabulous>

...
```

## Contributing Guidelines

Please refer [CONTRIBUTING.md](https://github.com/syook/react-tabulous/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/syook/react-tabulous/blob/master/LICENSE.md)
