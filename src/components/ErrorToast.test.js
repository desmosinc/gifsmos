import React from 'react';
import ErrorToast from './ErrorToast';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<ErrorToast/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<ErrorToast />);
  });

  it('shows error when passed message prop', () => {
    const { getByText } = global.renderWithRedux(
      <ErrorToast message="error" />
    );
    expect(getByText('error')).toBeTruthy();
  });

  it('does not show error when message prop not passed', () => {
    const { queryByText } = global.renderWithRedux(<ErrorToast />);
    expect(queryByText('error')).toBeFalsy();
  });
});
