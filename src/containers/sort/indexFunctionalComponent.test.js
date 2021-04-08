import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import SortProvider from './indexFunctionalComponent';

configure({ adapter: new Adapter() });

describe('SortProvider', () => {
  it('should render without crashing', () => {
    shallow(<SortProvider />);
  });

  it('should match snapshot', () => {
    const tree = shallow(<SortProvider />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
