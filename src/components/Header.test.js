import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {
  xit('renders without crashing', () => {
    global.renderWithRedux(<Header />);
  });

  xit('renders logo', () => {
    let wrapper = shallow(<Header />);
    expect(wrapper.text()).toContain('GIFsmos');
  });

  xit('renders help info', () => {
    let wrapper = shallow(<Header />);
    expect(wrapper.text()).toContain('Paste a Desmos link');
  });
});
