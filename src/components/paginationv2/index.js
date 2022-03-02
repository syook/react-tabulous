import './index.css';
import React from 'react';
import { Popup } from 'semantic-ui-react';
import Button from '../button';
import Select from '../select';
import Input from '../input';
import Icon from '../icon';

const Pagination = () => {
  return (
    <div className="rt-pagination">
      <Button className="pagination-btn" variant="text">
        <Icon name="chevron-left" width={24} height={24} />
      </Button>
      <Button className="pagination-btn" variant="text">
        <Icon name="chevron-right" width={24} height={24} />
      </Button>
      <Popup
        on="click"
        positionFixed
        position="bottom left"
        trigger={<Button variant="outline">1 - 20 of 500</Button>}
        content={
          <div className="rt-pagination-body">
            <div className="body-row">
              <div className="row-title">Show</div>
              <div className="body-input-container">
                <Select
                  className="body-input-field"
                  options={[
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 },
                  ]}
                  onChange={() => {}}
                />
                <span>items</span>
              </div>
            </div>
            <div className="body-row">
              <div className="row-title">Jump to Page</div>
              <div className="body-input-container">
                <Input className="body-input-field" value="7" type="number" onChange={() => {}} /> <span>of 15</span>
              </div>
            </div>
            <div className="rt-pagination-footer">
              <Button className="rt-pagination-btn-cancel" variant="text">
                Cancel
              </Button>
              <Button className="rt-pagination-btn-apply" variant="primary">
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
