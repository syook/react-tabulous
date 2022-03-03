import './index.css';
import React, { useState } from 'react';
import { Popup } from 'semantic-ui-react';
import Button from '../button';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';

// const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
//   value: num,
//   label: num,
// }));

const Pagination = props => {
  // if (!props.data.length) return null;

  // const maxRowOptionAvailable = (
  //   rowsPerPageOptions.find(obj => obj.value >= props.rowCount) || rowsPerPageOptions[rowsPerPageOptions.length - 1]
  // ).value;
  // const pageOptions = rowsPerPageOptions.filter(obj => +obj.value <= +maxRowOptionAvailable);
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = () => {
    setIsOpen(true);
  };

  const onCloseHandler = () => {
    props.cancelPaginationChangesHandler();
    setIsOpen(false);
  };

  const onApplyHandler = () => {
    props.applyPaginationChangesHandler();
    setIsOpen(false);
  };

  return (
    <div className="rt-pagination">
      <Button data-direction="LEFT" onClick={props.handleDirectionClick} className="pagination-btn" variant="text">
        <Icon name="chevron-left" width={24} height={24} />
      </Button>
      <Button data-direction="RIGHT" onClick={props.handleDirectionClick} className="pagination-btn" variant="text">
        <Icon name="chevron-right" width={24} height={24} />
      </Button>
      <Popup
        on="click"
        positionFixed
        position="bottom left"
        trigger={
          <Button variant="outline">
            {props.startIndexOfCurrentPage} - {props.endIndexOfCurrentPage} of {props.rowCount}
          </Button>
        }
        open={isOpen}
        onOpen={onOpenHandler}
        onClose={onCloseHandler}
        content={
          <div className="rt-pagination-body">
            <div className="body-row">
              <div className="row-title">Show</div>
              <div className="body-input-container">
                <Select
                  className="body-input-field"
                  defaultValue={props.rowsPerPage}
                  options={[
                    { label: 5, value: 5 },
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 },
                  ]}
                  onChange={props.setRowsPerPageHandler}
                />
                <span>items</span>
              </div>
            </div>
            <div className="body-row">
              <div className="row-title">Jump to Page</div>
              <div className="body-input-container">
                <Input
                  className="body-input-field"
                  defaultValue={props.currentPage}
                  type="number"
                  page={'This is a test string'}
                  max={props.numberOfPages}
                  onChange={props.setCurrentPageToHandler}
                />{' '}
                <span>of {props.numberOfPages}</span>
              </div>
            </div>
            <div className="rt-pagination-footer">
              <Button className="rt-pagination-btn-cancel" variant="text" onClick={onCloseHandler}>
                Cancel
              </Button>
              <Button className="rt-pagination-btn-apply" variant="primary" onClick={onApplyHandler}>
                Apply
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Pagination;
