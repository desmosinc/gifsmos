import React from 'react';
import InfoIcon from './InfoIcon';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<InfoIcon/>', () => {
  it('renders without crashing', () => {
    render(<InfoIcon />);
  });

  it('renders icon', () => {
    const { container } = render(<InfoIcon />);
    expect(container.querySelector('img[alt="info icon"]')).toBeTruthy();
  });

  it('shows and hides info text when clicked', () => {
    const { queryByText, container } = render(
      <InfoIcon infoText="info text" />
    );
    expect(queryByText('info text').parentElement.className).toBe(
      'InfoIcon-text hide'
    );
    fireEvent.click(container.querySelector('img'));
    expect(queryByText('info text').parentElement.className).toBe(
      'InfoIcon-text show'
    );
    fireEvent.click(container.querySelector('img'));
    expect(queryByText('info text').parentElement.className).toBe(
      'InfoIcon-text hide'
    );
  });
});
