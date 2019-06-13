import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import rootReducer from './reducers';

global.console = {
  log: jest.fn()
};

global.Desmos = {
  GraphingCalculator: jest.fn()
};

global.renderWithRedux = (
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store
});

configure({ adapter: new Adapter() });
