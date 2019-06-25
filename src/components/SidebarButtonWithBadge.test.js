import React from 'react';
import SidebarButtonWithBadge from './SidebarButtonWithBadge';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButtonWithBadge/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<SidebarButtonWithBadge icon="icon" />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(
      <SidebarButtonWithBadge showBadge={true} color="color" icon="icon" />
    );
    // check that badge is present
    expect(getByTestId('SidebarButton-icon-button').lastChild).toBeTruthy();
  });
});
