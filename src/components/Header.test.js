import React from 'react';
import Header from './Header';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Header/>', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('renders appropriate content', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('.Header-logo').firstChild.tagName).toBe(
      'IMG'
    );
    expect(container.querySelector('.Header-logo').firstChild.alt).toBe(
      'GIFsmos logo'
    );
    expect(container.querySelector('.Header-help').textContent).toMatch(
      'Paste a Desmos link'
    );
  });
});
