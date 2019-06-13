import React from 'react';
import ErrorToast from './ErrorToast';

describe('ErrorToast', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<ErrorToast />);
  });
});
