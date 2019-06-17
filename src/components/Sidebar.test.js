import React from 'react';
import Sidebar from './Sidebar';
import { fireEvent } from '@testing-library/react';

describe('Sidebar', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<Sidebar />);
  });

  xit('renders appropriate content', () => {
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
    // click buttons
    fireEvent.click(cameraButton);
    fireEvent.click(burstButton);
    fireEvent.click(previewButton);
    fireEvent.click(settingsButton);
    // check event counts
    expect(requestFrame).toHaveBeenCalledTimes(1);
    expect(togglePane).toHaveBeenCalledTimes(3);
  });
});
