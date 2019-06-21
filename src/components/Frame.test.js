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
  });

  it('shows play symbol when playing', () => {
    const { getByTestId } = global.renderWithRedux(
      <Frame imageSrc="test" playing />
    );
    expect(
      getByTestId('Frame-container').firstChild.nextSibling.textContent
    ).toBe('\u275a \u275a');
  });

  it('shows pause symbol when paused', () => {
    const { getByTestId } = global.renderWithRedux(
      <Frame imageSrc="test" playing={false} />
    );
    expect(
      getByTestId('Frame-container').firstChild.nextSibling.textContent
    ).toBe('\u25b6');
  });
});
