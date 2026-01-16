import React from "react";
import "./Header.css";
import logo from '../logo/logo.png';

const Header = ({ theme, toggleTheme }) => {
  return (
    <div className="header">

      <div className="header-content">
        <a href="/" style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Pokedex Logo" className="header-logo" />
        </a>
      </div>
      {/* Theme toggler */}
      <div className="theme-toggler">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Header;
