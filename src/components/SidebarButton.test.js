import React from 'react';
import SidebarButton from './SidebarButton';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButton/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<SidebarButton />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(<SidebarButton />);
    expect(getByTestId('SidebarButton-icon-button').firstChild.alt).toBe(
      'icon icon'
    );
  });
});
