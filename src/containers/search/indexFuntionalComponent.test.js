import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import SearchProvider from './indexFuntionalComponent';
// import { it } from 'date-fns/locale';

configure({ adapter: new Adapter() });

const rawData = [
  { id: 1, description: 'Dev', isDeleted: false, is_completed: true, name: 'Harsh Singh' },
  { id: 2, description: 'QA', isDeleted: false, name: 'Prakash' },
];
const searchKeys = {
  Description: true,
  Name: true,
};
const tableData = [
  { id: 1, objIndex: 0, name: 'Harsh Singh', description: 'Dev' },
  { id: 2, objIndex: 1, name: 'Prakash', description: 'QA' },
];

describe('SearchProvider', () => {
  it('renders without crashing', () => {
    shallow(<SearchProvider />);
  });

  it('accepts props', () => {
    const wrapper = mount(<SearchProvider rawData={rawData} searchKeys={searchKeys} tableData={tableData} />);
    expect(wrapper.props().rawData).toEqual(rawData);
    expect(wrapper.props().searchKeys).toEqual(searchKeys);
    expect(wrapper.props().tableData).toEqual(tableData);
  });

  it('matches snapshot', () => {
    const tree = shallow(<SearchProvider />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render search input', () => {
    const wrapper = shallow(<SearchProvider />);
    expect(wrapper.find('SearchComponent').exists()).toBe(true);
  });

  it('initial disabled prop should be true', () => {
    const wrapper = shallow(<SearchProvider />);
    expect(wrapper.find('SearchComponent').prop('disabled')).toBe(true);
  });

  it('name prop in SearchComponent will be undefined if tableName is not passed', () => {
    const wrapper = shallow(<SearchProvider />);
    expect(wrapper.find('SearchComponent').prop('name')).toBe(undefined);
  });

  it('name prop in SearchComponent should be passed tableName prop', () => {
    const tableName = 'data table';
    const wrapper = shallow(<SearchProvider tableName={tableName} />);
    expect(wrapper.find('SearchComponent').prop('name')).toBe(tableName);
  });

  it('should matches snapshot if data is not empty', () => {
    const tree = shallow(<SearchProvider tableData={tableData} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
