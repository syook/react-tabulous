import { Label, Menu, MenuItem, Table } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

// const Radium = require('radium');

const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
  value: num,
  label: `${num} Items`,
}));

const handlePageClick = (e, props) => {
  props.setTableCurrentPage(+e.currentTarget.dataset['page'] || 1);
};

const handleDirectionClick = (e, props) => {
  const direction = e.currentTarget.dataset['direction'];
  let change = 0;
  if (direction === 'LEFT' && props.currentPage > 1) {
    change = -1;
  } else if (direction === 'RIGHT' && props.currentPage < props.numberOfPages) {
    change = 1;
  }
  if (change !== 0) {
    props.setTableCurrentPage(props.currentPage + change || 1);
  }
};

const TablePagination = props => {
  const maxRowOptionAvailable = (
    rowsPerPageOptions.find(obj => obj.value >= props.rowCount) ||
    rowsPerPageOptions[rowsPerPageOptions.length - 1]
  ).value;
  const pageOptions = rowsPerPageOptions.filter(
    obj => +obj.value <= maxRowOptionAvailable
  );

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell
          className="paginationFooter"
          colSpan={props.numberOfColumns}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label ribbon>
              Total {props.name} : {props.rowCount}
            </Label>
            {props.rowCount >= 5 ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#26547c',
                    fontSize: '13px',
                    fontWeight: 'normal',
                    margin: '0px 15px',
                  }}>
                  Show
                </span>
                <Select
                  style={{
                    width: '115px',
                    fontWeight: 'normal',
                  }}
                  value={props.rowsPerPage}
                  options={pageOptions}
                  onChange={props.onSelectRowsPerPage}
                  isClearable={false}
                  isSearchable={false}
                />
                <Menu floated="right" pagination>
                  <MenuItem
                    icon="angle double left"
                    data-page={1}
                    onClick={e => handlePageClick(e, props)}
                  />
                  <MenuItem
                    data-direction="LEFT"
                    onClick={e => handleDirectionClick(e, props)}
                    icon="angle left"
                  />
                  {props.pageRange.map(pageIndex => (
                    <MenuItem
                      key={pageIndex}
                      content={`${pageIndex}`}
                      data-page={pageIndex}
                      onClick={e => handlePageClick(e, props)}
                      active={pageIndex === props.currentPage}
                      as="a"
                    />
                  ))}
                  <MenuItem
                    data-direction="RIGHT"
                    onClick={e => handleDirectionClick(e, props)}
                    icon="angle right"
                  />
                  <MenuItem
                    icon="angle double right"
                    data-page={props.numberOfPages}
                    onClick={e => handlePageClick(e, props)}
                  />
                </Menu>
              </div>
            ) : null}
          </div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

TablePagination.propTypes = {
  pageRange: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  numberOfColumns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsPerPage: PropTypes.object.isRequired,
  onSelectRowsPerPage: PropTypes.func.isRequired,
  setTableCurrentPage: PropTypes.func.isRequired,
};

TablePagination.defaultProps = {
   pageRange: []
}
export default TablePagination;
