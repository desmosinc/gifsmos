import React from 'react';
import Sidebar from './Sidebar';
import { cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('<Sidebar/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Sidebar />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(<Sidebar />);
    // check that all 4 buttons render icons as children
    expect(getByTestId('SidebarButton-camera-button').firstChild.alt).toBe(
      'camera icon'
    );
    expect(getByTestId('SidebarButton-burst-button').firstChild.alt).toBe(
      'burst icon'
    );
    expect(getByTestId('SidebarButton-preview-button').firstChild.alt).toBe(
      'preview icon'
    );
    expect(getByTestId('SidebarButton-settings-button').firstChild.alt).toBe(
      'settings icon'
    );
    // help link
    expect(getByTestId('Sidebar-help-link').textContent).toBe('Help');
  });

  it('checks that buttons call appropriate functions when clicked', () => {
    // mock functions
    const requestFrame = jest.fn();
    const togglePane = jest.fn();
    // render
    const { getByTestId } = global.renderWithRedux(
      <Sidebar requestFrame={requestFrame} togglePane={togglePane} />
    );
    // grab buttons
    const cameraButton = getByTestId('SidebarButton-camera-button');
    const burstButton = getByTestId('SidebarButton-burst-button');
    const previewButton = getByTestId('SidebarButton-preview-button');
    const settingsButton = getByTestId('SidebarButton-settings-button');
    // click buttons and check event counts
    fireEvent.click(cameraButton);
    expect(requestFrame).toHaveBeenCalledTimes(1);
    fireEvent.click(burstButton);
    fireEvent.click(previewButton);
    fireEvent.click(settingsButton);
    expect(togglePane).toHaveBeenCalledTimes(3);
  });
});
