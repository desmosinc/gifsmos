import React from 'react';
import SidebarButton from './SidebarButton';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<SidebarButton/>', () => {
  it('renders without crashing', () => {
    render(<SidebarButton />);
  });

  it('renders appropriate content', () => {
    const { container } = render(<SidebarButton icon="icon" />);
    expect(container.querySelector('.SidebarButton-tooltiptext')).toBeTruthy();
    expect(container.querySelector('button.SidebarButton')).toBeTruthy();
    expect(container.querySelector('img[alt="icon icon"]')).toBeTruthy();
  });

  it('runs appropriate logic on click', () => {
    const onClick = jest.fn();
    const { container } = render(<SidebarButton onClick={onClick} />);
    fireEvent.click(container.querySelector('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
