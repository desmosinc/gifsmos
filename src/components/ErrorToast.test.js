import React from 'react';
import ErrorToast from './ErrorToast';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<ErrorToast/>', () => {
  it('renders without crashing', () => {
    render(<ErrorToast />);
  });

  it('shows error when passed message prop', () => {
    const { getByText } = render(<ErrorToast message="error" />);
    expect(getByText('error')).toBeTruthy();
  });

  it('does not show error when message prop not passed', () => {
    const { queryByText } = render(<ErrorToast />);
    expect(queryByText('error')).toBeFalsy();
  });
});
