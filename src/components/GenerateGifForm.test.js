import React from 'react';
import GenerateGifForm from './GenerateGifForm';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

const onSubmit = jest.fn();
const updateGIFFileName = jest.fn();
const updateText = jest.fn();
const updateTextPosition = jest.fn();
const updateTextColor = jest.fn();

describe('<GenerateGifForm/>', () => {
  xit('renders without crashing', () => {
    render(<GenerateGifForm />);
  });

  xit('renders appropriate content', () => {
    const { container } = render(<GenerateGifForm />);
    expect(container.querySelectorAll('input').length).toBe(3);
    expect(container.querySelector('input[name="name"]')).toBeTruthy();
    expect(container.querySelector('input[name="caption"]')).toBeTruthy();
    expect(container.querySelector('input[name="fontColor"]')).toBeTruthy();
    expect(container.querySelector('button').textContent).toBe('Download GIF');
  });

  xit('has functioning inputs', () => {
    const { container } = render(
      <GenerateGifForm
        updateGIFFileName={updateGIFFileName}
        updateText={updateText}
        updateTextPosition={updateTextPosition}
        updateTextColor={updateTextColor}
      />
    );
    // change input values
    fireEvent.change(container.querySelector('input[name="name"]'), {
      target: { value: 'name' }
    });
    fireEvent.change(container.querySelector('input[name="caption"]'), {
      target: { value: 'caption' }
    });
    fireEvent.change(container.querySelector('input[name="placement"]'), {
      target: { value: 'top-left' }
    });

    // check to see that handleInputUpdate dispatches appropriate actions
    expect(updateGIFFileName).toHaveBeenCalled();
    expect(updateText).toHaveBeenCalled();
    expect(updateTextPosition).toHaveBeenCalled();
  });

  xit('has a functioning submit button', () => {
    const { getByText } = render(
      <GenerateGifForm handleGenerateGIF={onSubmit} />
    );
    fireEvent.click(getByText('Download GIF'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
