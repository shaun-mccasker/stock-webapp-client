import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
//myfunc import
import { useAppContext } from "../services/contextLib";
// the header
export default function Header() {
  return (
    <header>
      <MyNav />
    </header>
  );
}

//Components to put inside header
const MyNav = () => {
  const { isAuth, userHasAuth } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  function handleLogout() {
    localStorage.removeItem("token");
    userHasAuth(false);
  }
  return (
    <div>
      <Navbar dark expand="md">
        <NavbarBrand>
          <Link to="/">Home</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" onClick={toggle} navbar>
            <NavItem>
              <Link to="/stocks">Stocks</Link>
            </NavItem>
            {isAuth ? (
              <NavItem
                onClick={(event) => {
                  handleLogout();
                }}
              >
                <Link to="/">Log Out</Link>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link to="/log-in">Log in</Link>
                </NavItem>
                <NavItem>
                  <Link to="/sign-up">Sign up</Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
