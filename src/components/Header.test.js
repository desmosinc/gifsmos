import React from 'react';
import Header from './Header';
import { render } from '@testing-library/react';

describe('Header', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<Header />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('header-logo').textContent).toBe('GIFsmos');
    expect(getByTestId('header-help').textContent.slice(0, 5)).toBe('Paste');
  });
});
