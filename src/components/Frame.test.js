import React from 'react';
import Frame from './Frame';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Frame/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Frame />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(<Frame imageSrc="test" />);
    expect(getByTestId('Frame-container').firstChild.alt).toBe('current frame');
    expect(
      getByTestId('Frame-container').firstChild.nextSibling.textContent
    ).toBe('▶');
  });
});
