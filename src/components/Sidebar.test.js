import React from 'react';
import Sidebar from './Sidebar';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Sidebar/>', () => {
  it('renders without crashing', () => {
    render(<Sidebar />);
  });

  it('renders tool buttons', () => {
    const { container } = render(<Sidebar numFrames={1} />);
    expect(
      container.querySelector('button[aria-label="capture frame"]')
    ).toBeTruthy();
    expect(
      container.querySelector('button[aria-label="multi-capture panel"]')
    ).toBeTruthy();
    expect(
      container.querySelector('button[aria-label="preview panel"]')
    ).toBeTruthy();
    expect(
      container.querySelector('button[aria-label="saved-graphs panel"]')
    ).toBeTruthy();
    expect(
      container.querySelector('button[aria-label="settings panel"]')
    ).toBeTruthy();
    expect(
      container.querySelector('button[aria-label="reset images"]')
    ).toBeTruthy();
  });

  it('renders help button', () => {
    const { container, getByText } = render(<Sidebar />);
    expect(container.querySelector('.Sidebar-help')).toBeTruthy();
    // expect(getByText('Help').getAttribute('href')).toMatch('http');
  });

  it('checks that buttons call appropriate functions when clicked', () => {
    const requestFrame = jest.fn();
    const togglePane = jest.fn();
    const { container } = render(
      <Sidebar requestFrame={requestFrame} togglePane={togglePane} />
    );
    fireEvent.click(
      container.querySelector('button[aria-label="capture frame"]')
    );
    expect(requestFrame).toHaveBeenCalledTimes(1);
    fireEvent.click(
      container.querySelector('button[aria-label="multi-capture panel"]')
    );
    fireEvent.click(
      container.querySelector('button[aria-label="preview panel"]')
    );
    fireEvent.click(
      container.querySelector('button[aria-label="saved-graphs panel"]')
    );
    fireEvent.click(
      container.querySelector('button[aria-label="settings panel"]')
    );
    expect(togglePane).toHaveBeenCalledTimes(4);
  });

  it('checks that reset button is hidden when no frames are in state', async () => {
    const { container } = render(<Sidebar />);
    expect(
      container.querySelector('button[aria-label="reset images"]')
    ).toBeFalsy();
  });
});
