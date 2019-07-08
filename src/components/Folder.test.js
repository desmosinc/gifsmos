import React from 'react';
import Folder from './Folder';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Folder/>', () => {
  it('renders without crashing', () => {
    render(<Folder />);
  });

  it('renders tool title', () => {
    const { getByText } = render(<Folder expanded />);
    expect(getByText('Folder')).toBeTruthy();
  });

  it('renders appropriate content', () => {
    const { container, getByText } = render(<Folder expanded />);
    expect(getByText('Name').nextSibling.getAttribute('placeholder')).toBe(
      'Graph name'
    );
    expect(container.querySelector('button').textContent).toBe('Save');
    expect(getByText('Saved Graphs')).toBeTruthy();
  });

  it('has a functional save button', async () => {
    const images = { frames: {}, frameIDs: [] };
    const saveGraph = jest.fn();
    const { getByText } = render(
      <Folder expanded saveGraph={saveGraph} images={images} />
    );
    fireEvent.click(getByText('Save'));
    expect(saveGraph).toHaveBeenCalled();
  });
});
