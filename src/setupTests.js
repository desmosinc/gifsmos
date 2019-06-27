import 'jest-dom/extend-expect';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import rootReducer from './reducers';

global.console = {
  log: jest.fn(),
  error: jest.fn()
};

global.Desmos = {
  GraphingCalculator: jest.fn(() => {
    return {
      asyncScreenshot: (opts, cb) => cb(''),
      getExpressions: () => [
        { id: 1, type: 'expression', latex: 'x = 3' },
        { id: 2, latex: '' }
      ],
      setExpression: () => null
    };
  })
};

global.renderWithRedux = (
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store
});

global.HTMLCanvasElement.prototype.getContext = jest.fn();
