import React from "react";
import { Nav, Navbar, Container, NavLink, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
// import {LinkContainer} from 'react-router-bootstrap';
import logo from "../assets/logo.png";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* <LinkContainer to='/'> */}
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" />
            ProShop
          </Navbar.Brand>
          {/* </LinkContainer> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {/* <LinkContainer to='/cart'> */}
              <NavLink href="/cart">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </NavLink>
              {/* </LinkContainer> */}
              {/* <LinkContainer to='/login'> */}
              <NavLink href="/login">
                <FaUser />
                Sign in
              </NavLink>
              {/* </LinkContainer> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
