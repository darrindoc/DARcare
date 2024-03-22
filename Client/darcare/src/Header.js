import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from './Managers/UserProfileManager'; 
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom";

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //Access localstorage for userProfile
  const userString = localStorage.getItem("userProfile");
  const user = JSON.parse(userString);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">💖DARcare -- St. Sarah's Regional Medical Center</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar class="ml-auto">
          <Nav className="mr-auto fixed-top" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn && <>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem >
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>

              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}