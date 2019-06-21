import React from 'react';
import Preview from './Preview';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Preview/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Preview />);
  });

  it('renders appropriate content', () => {
    const { getByTestId } = global.renderWithRedux(
      <Preview expanded previewIdx={0} frames={{ 1: 'test' }} frameIDs={[1]} />
    );
    expect(getByTestId('Preview-scrubber').firstChild.type).toBe('range');
    expect(getByTestId('Preview-scrubber-counter').textContent).toBe('1 / 1');
    // revisit the following test after generate gif form implemented
    expect(
      getByTestId('Preview-create-button-container').firstChild.textContent
    ).toBe('Generate GIF');
  });
});
