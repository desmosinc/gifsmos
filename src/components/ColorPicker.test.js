import React from 'react';
import ColorPicker from './ColorPicker';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<ColorPicker/>', () => {
  xit('renders without crashing', () => {
    render(<ColorPicker />);
  });

  xit('renders separate sections of picker', () => {
    const { container } = render(<ColorPicker />);
    expect(container.querySelector('.sketch-picker')).toBeTruthy();
    expect(container.querySelector('.saturation-white')).toBeTruthy();
    expect(container.querySelector('.hue-horizontal')).toBeTruthy();
    expect(container.querySelector('.flexbox-fix')).toBeTruthy();
  });

  it('dispatches action to change color on change', async () => {
    const updateTextColor = jest.fn();
    const { container } = render(
      <ColorPicker updateTextColor={updateTextColor} />
    );
    fireEvent.click(container.querySelector('div[title="#7ED321"]'));
    await wait();
    expect(updateTextColor).toHaveBeenCalled();
  });
});
