import React from 'react';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButtonWithBadge/>', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<SidebarButtonWithBadge />);
  });

  xit('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(
      <SidebarButtonWithBadge showBadge={true} color="color" />
    );
    // check that badge is present
    expect(getByTestId('SidebarButton-icon-button').lastChild).toBeTruthy();
  });
});
