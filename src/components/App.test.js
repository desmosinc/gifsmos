import React from 'react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    let wrapper = global.renderWithRedux(<App />);
  });
});
