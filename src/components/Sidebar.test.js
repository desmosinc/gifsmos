import React from 'react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<Sidebar />);
  });

  xit('renders text content', () => {
    const { container } = global.renderWithRedux(<Sidebar />);
    expect(container).toHaveTextContent('Help');
  });

  xit('', () => {
    const { container } = global.renderWithRedux(<Sidebar />);
    expect(container.firstChild.classList.contains('SidebarButton')).toBe(true);
  });
});

// expect(axiosMock.get).toHaveBeenCalledTimes(1)
// expect(axiosMock.get).toHaveBeenCalledWith(url)
// expect(getByTestId('greeting-text')).toHaveTextContent('hello there')
// expect(getByTestId('ok-button')).toHaveAttribute('disabled')
