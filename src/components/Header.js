import React from 'react';
import './Header.css';

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="logo">Trace Tool</div>
      </div>
    </header>
  );
};

export default Header;
