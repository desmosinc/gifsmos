import React from 'react';
import ErrorToast from './ErrorToast';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<ErrorToast/>', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<ErrorToast />);
  });

  it('renders appropriate content', () => {
    const { getByText } = global.renderWithRedux(
      <ErrorToast message="error" />
    );
    expect(getByText('error').tagName).toBe('DIV');
  });
});
