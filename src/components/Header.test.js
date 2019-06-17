import React from 'react';
import Header from './Header';

describe('<Header />', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<Header />);
  });

  xit('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(<Header />);
    expect(getByTestId('Header-logo').textContent).toBe('GIFsmos');
    expect(getByTestId('Header-help').textContent.slice(0, 5)).toBe('Paste');
  });
});
