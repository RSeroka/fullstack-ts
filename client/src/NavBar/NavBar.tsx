
// code mostly referenced from https://www.codevertiser.com/reactjs-responsive-navbar/


import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';
// import { ReactComponent as Brand } from '../logo.svg';
import "./NavBar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const onLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setShowNavbar(false);
  } 

  return (
    <nav className="nbs-navbar">
      <div className="nbs-container">
        <div className="nbs-logo">
          <h1>Richard Seroka</h1>
        </div>
        <div className="nbs-menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nbs-nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={onLinkClick}>Home</NavLink>
            </li>

            <li>
              <NavLink to="/resume" onClick={onLinkClick}>Resume</NavLink>
            </li>

            <li>
              <NavLink to="/sudoku" onClick={onLinkClick}>Sudoku</NavLink>
            </li>

            <li>
              <NavLink to="/blackjack" onClick={onLinkClick}>Blackjack</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar