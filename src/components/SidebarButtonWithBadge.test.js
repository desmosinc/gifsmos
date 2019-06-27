import React from 'react';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButtonWithBadge/>', () => {
  it('renders without crashing', () => {
    render(<SidebarButtonWithBadge />);
  });

  it('renders appropriate content', () => {
    const { container } = render(<SidebarButtonWithBadge showBadge />);
    expect(container.querySelector('.SidebarButton-badge')).toBeTruthy();
  });
});
