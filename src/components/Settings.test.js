import React from 'react';
import Settings from './Settings';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Settings/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Settings />);
  });

  it('renders appropriate content', () => {
    // render
    const { getByTestId, getByText } = global.renderWithRedux(
      <Settings expanded />
    );
    // grab labels
    const widthLabel = getByTestId('Settings-image-width-label');
    const heightLabel = getByTestId('Settings-image-height-label');
    const intervalLabel = getByTestId('Settings-frame-interval-label');
    // check that labels have corresponding inputs
    expect(widthLabel.nextSibling.tagName).toBe('INPUT');
    expect(heightLabel.nextSibling.tagName).toBe('INPUT');
    expect(intervalLabel.nextSibling.tagName).toBe('INPUT');
    // check that corresponding inputs are correct
    expect(widthLabel.nextSibling.name).toBe('width');
    expect(heightLabel.nextSibling.name).toBe('height');
    expect(intervalLabel.nextSibling.name).toBe('interval');
    // check for oversample checkbox
    expect(getByText('Oversample').previousSibling.type).toBe('checkbox');
  });
});
