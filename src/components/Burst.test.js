import React from 'react';
import Burst from './Burst';
import * as calcHelpers from '../lib/calc-helpers';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';

afterEach(cleanup);

describe('<Burst/>', () => {
  xit('renders without crashing', () => {
    render(<Burst />);
  });

  xit('renders tool title', () => {
    const { getByText } = render(<Burst expanded />);
    expect(getByText('Burst')).toBeTruthy();
  });

  xit('renders labels/inputs', () => {
    const { getByText } = render(<Burst expanded />);
    // grab labels
    const sliderIndexLabel = getByText('Slider Index');
    const sliderMinLabel = getByText('Slider Min');
    const sliderMaxLabel = getByText('Slider Max');
    const sliderStepLabel = getByText('Slider Step');
    // check that labels have correct corresponding inputs
    expect(sliderIndexLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderIndexLabel.nextSibling.name).toBe('idx');
    expect(sliderMinLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderMinLabel.nextSibling.name).toBe('min');
    expect(sliderMaxLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderMaxLabel.nextSibling.name).toBe('max');
    expect(sliderStepLabel.nextSibling.tagName).toBe('INPUT');
    expect(sliderStepLabel.nextSibling.name).toBe('step');
  });

  xit('has a functioning capture button', async () => {
    calcHelpers.getCalcState = jest.fn();
    const requestBurst = jest.fn();
    const { getByText } = render(
      <Burst expanded frameIDs={[]} requestBurst={requestBurst} />
    );
    fireEvent.click(getByText('Capture'));
    await wait();
    expect(requestBurst).toHaveBeenCalled();
  });
});
