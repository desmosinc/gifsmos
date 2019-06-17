import React from 'react';
import Sidebar from './Sidebar';
import { render } from '@testing-library/react';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Sidebar />);
  });

  it('renders appropriate content', () => {
    const { getByTestId, debug } = render(<Sidebar />);
    debug();
    // expect(getByTestId('').tagName).toBe('');
  });

  // it('changes depending on state', () => {
  //   const { getByTestId, debug } = global.renderWithRedux(<Sidebar />);
  // });
});

// expect(axiosMock.get).toHaveBeenCalledTimes(1)
// expect(axiosMock.get).toHaveBeenCalledWith(url)
// expect(getByTestId('greeting-text')).toHaveTextContent('hello there')
// expect(getByTestId('ok-button')).toHaveAttribute('disabled')
