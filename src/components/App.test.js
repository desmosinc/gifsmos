import React from 'react';
import App from './App';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<App/>', () => {
  it('renders without crashing', () => {
    let wrapper = global.renderWithRedux(<App />);
    global.renderWithRedux(<App />);
  });
});
