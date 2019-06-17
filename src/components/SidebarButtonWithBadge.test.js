import React from 'react';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';

describe('SidebarButtonWithBadge', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<SidebarButtonWithBadge />);
  });

  xit('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(
      <SidebarButtonWithBadge showBadge={true} color="color" />
    );
    // check that badge is present
    expect(getByTestId('SidebarButton-icon-button').lastChild.tagName).toBe(
      'DIV'
    );
  });
});
