import React from "react";
import {
  Nav,
  Navbar,
  Container,
  NavLink,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { logOut } from "../slices/usersSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall, isLoading] = useLogoutMutation()
  const logoutHandler = async() =>{
    try{
      await logoutApiCall().unwrap()
      dispatch(logOut())
      navigate('/login')
    }catch(error){
      toast.error(error?.error|| error?.data?.message)
    }
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <NavLink href="/cart">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </NavLink>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link href="/login">
                  <FaUser />
                  Sign in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
