import React from 'react';
import Settings from './Settings';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Settings/>', () => {
  it('renders without crashing', () => {
    render(<Settings />);
  });

  it('renders tool title', () => {
    const { getByText } = render(<Settings expanded />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders labels/inputs', () => {
    const { getByText } = render(<Settings expanded />);

    // grab labels
    const widthLabel = getByText('Image Width');
    const heightLabel = getByText('Image Height');
    const intervalLabel = getByText('Interval (ms)');
    const oversampleLabel = getByText('Oversample');
    const strategyBoundLabel = getByText('Strategy');

    // check that labels have correct corresponding inputs
    expect(widthLabel.nextSibling.name).toBe('width');
    expect(widthLabel.nextSibling.type).toBe('number');

    expect(heightLabel.nextSibling.name).toBe('height');
    expect(heightLabel.nextSibling.type).toBe('number');

    expect(intervalLabel.nextSibling.name).toBe('interval');
    expect(intervalLabel.nextSibling.type).toBe('number');

    expect(oversampleLabel.previousSibling.name).toBe('oversample');
    expect(oversampleLabel.previousSibling.type).toBe('checkbox');

    expect(strategyBoundLabel.nextSibling.name).toBe('strategy');
    expect(strategyBoundLabel.nextSibling.className).toBe('Settings-dropdown');
  });

  it('updates state on input change', () => {
    const updateSetting = jest.fn();
    const { container } = render(
      <Settings expanded updateSetting={updateSetting} />
    );

    fireEvent.change(container.querySelector('input[name="width"]'), {
      target: { value: '200' }
    });
    fireEvent.change(container.querySelector('input[name="height"]'), {
      target: { value: '200' }
    });
    fireEvent.change(container.querySelector('input[name="interval"]'), {
      target: { value: '200' }
    });
    fireEvent.click(container.querySelector('input[name="oversample"]'));
    fireEvent.change(container.querySelector('input[name="top"]'), {
      target: { value: '20' }
    });
    fireEvent.change(container.querySelector('input[name="bottom"]'), {
      target: { value: '20' }
    });
    fireEvent.change(container.querySelector('input[name="left"]'), {
      target: { value: '20' }
    });
    fireEvent.change(container.querySelector('input[name="right"]'), {
      target: { value: '20' }
    });
    fireEvent.change(container.querySelector('select[name="strategy"]'), {
      target: { value: 'stretch' }
    });

    expect(updateSetting).toHaveBeenCalledTimes(9);
  });
});
