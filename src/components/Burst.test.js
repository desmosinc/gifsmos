import React from 'react';
import Burst from './Burst';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Burst/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Burst />);
  });

  it('renders appropriate content', () => {
    // render
    const { getByTestId } = global.renderWithRedux(<Burst expanded={true} />);
    // grab labels
    const sliderIndexLabel = getByTestId('Burst-slider-index-label');
    const sliderMinLabel = getByTestId('Burst-slider-min-label');
    const sliderMaxLabel = getByTestId('Burst-slider-max-label');
    const sliderStepLabel = getByTestId('Burst-slider-step-label');
    // check that labels have corresponding inputs
    expect(sliderIndexLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderMinLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderMaxLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderStepLabel.nextSibling.tagName).toBe('INPUT');
    // check that corresponding inputs are correct
    expect(sliderIndexLabel.nextSibling.name).toBe('idx');
    expect(sliderMinLabel.nextSibling.name).toBe('min');
    expect(sliderMaxLabel.nextSibling.name).toBe('max');
    expect(sliderStepLabel.nextSibling.name).toBe('step');
  });
});
