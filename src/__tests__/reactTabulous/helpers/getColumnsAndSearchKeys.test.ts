import { getColumnsAndSearchKeys } from '../../../reactTabulous/helpers/getColumnsAndSearchKeys';

describe('getColumnsAndSearchKeys', () => {
  test('should return columns and searchKeys', () => {
    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        type: 'string',
        isSearchable: false
      },
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        isSearchable: true
      },
      {
        field: 'email',
        type: 'string',
        headerName: 'Email'
      }
    ];
    const { columns: newColumns, searchKeys } = getColumnsAndSearchKeys(columns);
    expect(newColumns).toEqual([
      {
        field: 'id',
        headerName: 'ID',
        type: 'string',
        isSearchable: false,
        isVisible: true,
        pinned: null,
        width: 'max-content'
      },
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        isSearchable: true,
        isVisible: true,
        pinned: null,
        width: 'max-content'
      },
      {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        isSearchable: false,
        isVisible: true,
        pinned: null,
        width: 'max-content'
      }
    ]);
    expect(searchKeys).toEqual(['name']);
  });
});
