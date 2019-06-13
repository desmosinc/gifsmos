import React from 'react';
import Sidebar from './Sidebar';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    global.renderWithRedux(<Sidebar />);
  });

  it('', () => {
    let wrapper = shallow(<Sidebar />);
    // let serialized = toJson(wrapper);
    expect(wrapper.find('SidebarButton')).toHaveLength(3);
    expect(wrapper.find('SidebarButtonWithBadge')).toHaveLength(1);
  });
});
