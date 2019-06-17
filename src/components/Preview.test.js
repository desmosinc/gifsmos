import React from 'react';
import Preview from './Preview';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Preview/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Preview />);
  });

  it('renders appropriate content', () => {
    // render
    const { getByTestId } = global.renderWithRedux(
      <Preview
        expanded={true}
        previewIdx={0}
        frames={{ 1: 'test' }}
        frameIDs={[1]}
      />
    );
    expect(getByTestId('Frame-container').firstChild.alt).toBe('current frame');
    expect(
      getByTestId('Frame-container').firstChild.nextSibling.textContent
    ).toBe('▶');
    expect(getByTestId('Preview-scrubber').firstChild.type).toBe('range');
    expect(getByTestId('Preview-scrubber-counter').textContent).toBe('1 / 1');
    // the following test currently passes but will not once form component is implemented
    expect(
      getByTestId('Preview-create-button-container').firstChild.textContent
    ).toBe('Generate GIF');
  });
});
