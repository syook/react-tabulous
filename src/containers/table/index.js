import TableComponent from './indexFunctionalComponent';
import React from 'react';
import store from '../../store';
import { Provider } from 'react-redux';

const index = props => {
  return (
    <Provider store={store}>
      <TableComponent {...props} />
    </Provider>
  );
};

export default index;
