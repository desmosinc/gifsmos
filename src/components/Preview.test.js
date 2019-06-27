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
      <Preview expanded frameIDs={[1]} />
    );
    expect(getByTestId('Preview-scrubber').firstChild.type).toBe('range');
    expect(getByTestId('Preview-scrubber-counter').textContent).toBe('1 / 1');
    expect(getByTestId('Preview-container').querySelector('form')).toBeTruthy();
    expect(
      getByTestId('Preview-container').querySelector('.GenerateGifForm-button')
        .textContent
    ).toBe('Download GIF');
  });
});
