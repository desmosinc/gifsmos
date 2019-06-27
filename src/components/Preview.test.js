import React from 'react';
import Preview from './Preview';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Preview/>', () => {
  it('renders without crashing', () => {
    render(<Preview />);
  });

  it('renders tool title', () => {
    const { getByText } = render(<Preview expanded />);
    expect(getByText('Preview')).toBeTruthy();
  });

  it('renders appropriate content', () => {
    const { container } = global.renderWithRedux(
      <Preview expanded previewIdx={0} frames={{ 1: 'test' }} frameIDs={[1]} />
    );
    expect(container.querySelector('.Frame')).toBeTruthy();
    expect(container.querySelector('.Preview-scrubber')).toBeTruthy();
    expect(container.querySelector('.Preview-scrubber-counter')).toBeTruthy();
    expect(container.querySelector('.GenerateGifForm-form')).toBeTruthy();
    expect(container.querySelector('.Preview-progress-outer')).toBeTruthy();
  });

  it('displays correct frame count', () => {
    const { container } = global.renderWithRedux(
      <Preview
        expanded
        previewIdx={1}
        frames={{ 1: 'one', 2: 'two' }}
        frameIDs={[1, 2]}
      />
    );
    expect(
      container.querySelector('.Preview-scrubber-counter').textContent
    ).toBe('2 / 2');
  });

  it('displays message when no frames are in state', () => {
    const { container } = global.renderWithRedux(<Preview expanded />);
    expect(container.querySelector('.Preview-no-frames').textContent).toMatch(
      'No frames have been captured'
    );
  });
});
