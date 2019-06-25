import React from 'react';
import './Header.css';
import logo from './icons/gifsmos-logo.svg';

const Header = () => (
  <div className="Header">
    <div className="Header-logo" data-testid="Header-logo">
      <img src={logo} alt="GIFsmos logo" />
    </div>
    <div className="Header-help" data-testid="Header-help">
      Paste a Desmos link into the expressions list to import a saved graph.
    </div>
  </div>
);

export default Header;
