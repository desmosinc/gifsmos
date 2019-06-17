import React from 'react';
import SideBar from '../Sidebar';
import { createStore } from 'redux';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByLabelText,
  getByTitle
} from 'react-testing-library';

afterEach(cleanup);

test('Sidebar', () => {
  const { getByTestId } = renderWithRedux(<SideBar />);
  fireEvent.click(getByTestId('settings'));
  expect(getByTestId('settings')).toHaveAttribute('expanded', 'true');
});
