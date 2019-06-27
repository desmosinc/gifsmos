import React from 'react';
import SidebarButton from './SidebarButton';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButton/>', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<SidebarButton />);
  });

  xit('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(
      <SidebarButton icon="icon" />
    );
    expect(getByTestId('SidebarButton-icon-button').firstChild.alt).toBe(
      'icon icon'
    );
  });
});
