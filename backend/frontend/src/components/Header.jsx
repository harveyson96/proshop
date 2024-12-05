import React from 'react'
import {Nav, Navbar, Container, NavLink} from 'react-bootstrap'
import {FaShoppingCart, FaUser, } from 'react-icons/fa'
// import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        {/* <LinkContainer to='/'> */}
            <Navbar.Brand href='/'><img src={logo} alt='logo'/>ProShop</Navbar.Brand>
        {/* </LinkContainer> */}
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse >
                <Nav className='ms-auto'>
                {/* <LinkContainer to='/cart'> */}
                    <NavLink href='/cart'>{FaShoppingCart} Cart</NavLink>
                {/* </LinkContainer> */}
                {/* <LinkContainer to='/login'> */}
                    <NavLink href='/login'>{FaUser} Sign in</NavLink>
                {/* </LinkContainer> */}
                </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header
