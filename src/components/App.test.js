import React from 'react';
import App from './App';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<App/>', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<App />);
  });
});
