import React from 'react';
import Header from './Header';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Header/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Header />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(<Header />);
    expect(getByTestId('Header-logo').textContent).toBe('GIFsmos');
    expect(getByTestId('Header-help').textContent.slice(0, 5)).toBe('Paste');
  });
});
