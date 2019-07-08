import React from 'react';
import GenerateGifForm from './GenerateGifForm';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<GenerateGifForm/>', () => {
  it('renders without crashing', () => {
    render(<GenerateGifForm />);
  });

  it('renders appropriate content', () => {
    const { container, getByText } = render(<GenerateGifForm />);
    expect(container.querySelectorAll('input').length).toBe(2);
    expect(container.querySelector('input[name="name"]')).toBeTruthy();
    expect(container.querySelector('input[name="gifText"]')).toBeTruthy();
    expect(container.querySelector('select[name="placement"]')).toBeTruthy();
    expect(getByText('Pick GIF Text Color')).toBeTruthy();
    expect(getByText('Download GIF')).toBeTruthy();
  });

  it('has functioning inputs', () => {
    const updateGIFFileName = jest.fn();
    const updateText = jest.fn();
    const updateTextPosition = jest.fn();
    const { container } = render(
      <GenerateGifForm
        updateGIFFileName={updateGIFFileName}
        updateText={updateText}
        updateTextPosition={updateTextPosition}
      />
    );
    // change input values
    fireEvent.change(container.querySelector('input[name="name"]'), {
      target: { value: 'name' }
    });
    fireEvent.change(container.querySelector('input[name="gifText"]'), {
      target: { value: 'gifText' }
    });
    fireEvent.change(container.querySelector('select[name="placement"]'), {
      target: { value: 'top-left' }
    });

    // check to see that handleInputUpdate dispatches appropriate actions
    expect(updateGIFFileName).toHaveBeenCalled();
    expect(updateText).toHaveBeenCalled();
    expect(updateTextPosition).toHaveBeenCalled();
  });

  it('allows user to show and hide color picker', () => {
    const updateColorPicker = jest.fn();
    const { container, getByText } = render(
      <GenerateGifForm updateColorPicker={updateColorPicker} />
    );
    expect(container.querySelector('.sketch-picker')).toBeFalsy();
    fireEvent.click(getByText('Pick GIF Text Color'));
    expect(container.querySelector('.sketch-picker')).toBeTruthy();
    fireEvent.click(getByText('Pick GIF Text Color'));
    expect(container.querySelector('.sketch-picker')).toBeFalsy();
  });

  it('has a functioning submit button', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <GenerateGifForm handleGenerateGIF={onSubmit} />
    );
    fireEvent.click(getByText('Download GIF'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
