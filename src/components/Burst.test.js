import React from 'react';
import Burst from './Burst';
import * as calcHelpers from '../lib/calc-helpers';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';

afterEach(cleanup);

describe('<Burst/>', () => {
  it('renders without crashing', () => {
    render(<Burst />);
  });

  it('renders tool title', () => {
    const { getByText } = render(<Burst expanded />);
    expect(getByText('Burst')).toBeTruthy();
  });

  it('renders labels/inputs', () => {
    const { getByText } = render(<Burst expanded />);
    // grab labels
    const sliderIndexLabel = getByText('Slider');
    const sliderMinLabel = getByText('Slider Min');
    const sliderMaxLabel = getByText('Slider Max');
    const sliderStepLabel = getByText('Slider Step');
    // check that labels have correct corresponding inputs
    expect(sliderIndexLabel.nextSibling.name).toBe('idx');
    expect(sliderIndexLabel.nextSibling.tagName).toBe('SELECT');

    expect(sliderMinLabel.nextSibling.name).toBe('min');
    expect(sliderMinLabel.nextSibling.type).toBe('number');

    expect(sliderMaxLabel.nextSibling.name).toBe('max');
    expect(sliderMaxLabel.nextSibling.type).toBe('number');

    expect(sliderStepLabel.nextSibling.name).toBe('step');
    expect(sliderStepLabel.nextSibling.type).toBe('number');
  });

  it('has a functioning capture button', async () => {
    calcHelpers.getCalcState = jest.fn();
    const requestBurst = jest.fn();
    const { getByText } = render(
      <Burst expanded requestBurst={requestBurst} />
    );
    fireEvent.click(getByText('Capture'));
    await wait();
    expect(requestBurst).toHaveBeenCalled();
  });
});
