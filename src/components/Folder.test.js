import React from 'react';
import Folder from './Folder';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Folder/>', () => {
  xit('renders without crashing', () => {
    render(<Folder />);
  });

  xit('renders tool title', () => {
    const { getByText } = render(<Folder expanded />);
    expect(getByText('Folder')).toBeTruthy();
  });

  xit('renders appropriate content', () => {
    const { container, getByText } = render(<Folder expanded />);
    expect(getByText('Name').nextSibling.getAttribute('placeholder')).toBe(
      'Graph name'
    );
    expect(container.querySelector('button').textContent).toBe('Save');
    expect(getByText('Saved Graphs')).toBeTruthy();
  });

  xit('has a functional save button', async () => {
    const images = { frames: {}, frameIDs: [] };
    const saveGraph = jest.fn();
    const { getByText } = render(
      <Folder expanded saveGraph={saveGraph} images={images} />
    );
    fireEvent.click(getByText('Save'));
    expect(saveGraph).toHaveBeenCalled();
  });
});
