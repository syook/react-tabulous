import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import FilterProvider from './indexFunctionalComponent';

configure({ adapter: new Adapter() });

const data = [{ Description: 'Dev', Name: 'David', id: 1, objIndex: 0 }];

describe('FilterProvider', () => {
  it('should render without crashing', () => {
    shallow(<FilterProvider data={[]} />);
  });

  it('should match snapshot if data is empty', () => {
    const tree = shallow(<FilterProvider data={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should match snapshot if data is not empty', () => {
    const tree = shallow(<FilterProvider data={data} filterableColumns={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
