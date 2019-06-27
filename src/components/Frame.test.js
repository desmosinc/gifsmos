import React from 'react';
import Frame from './Frame';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Frame/>', () => {
  it('renders without crashing', () => {
    render(<Frame />);
  });

  it('renders appropriate content', () => {
    const { container } = render(<Frame imageSrc="test" />);
    expect(container.querySelector('.Frame').firstChild.tagName).toBe('IMG');
    expect(container.querySelector('.Frame').firstChild.alt).toBe(
      'current frame'
    );
  });

  it('shows play symbol when playing', () => {
    const { container } = render(<Frame imageSrc="test" playing />);
    expect(
      container.querySelector('.Frame').firstChild.nextSibling.textContent
    ).toBe('\u275a \u275a');
  });

  it('shows pause symbol when paused', () => {
    const { container } = render(<Frame imageSrc="test" playing={false} />);
    expect(
      container.querySelector('.Frame').firstChild.nextSibling.textContent
    ).toBe('\u25b6');
  });
});
