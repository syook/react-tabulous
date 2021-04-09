import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import PaginationProvider from './indexFunctioncalComponent';

configure({ adapter: new Adapter() });

describe('SortProvider', () => {
  it('should render without crashing', () => {
    shallow(<PaginationProvider data={[]} />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<PaginationProvider data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
