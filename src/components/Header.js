import React from 'react';
import './Header.css';

const Header = () => (
  <div className="Header">
    <div className="Header-logo">GIFsmos</div>
    <div className="Header-help">
      Paste a Desmos link into the expressions list to import a saved graph.
    </div>
  </div>
);

export default Header;
