
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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Richard Seroka</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/resume">Resume</NavLink>
            </li>

            <li>
              <NavLink to="/sudoku">Sudoku</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar