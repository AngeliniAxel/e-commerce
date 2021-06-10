import React from 'react';
import {
  Navbar as NavBarBootstrap,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import './Navbar.scss';

const Navbar = () => {
  return (
    <NavBarBootstrap expand='lg' className='nav'>
      <NavBarBootstrap.Brand className='brand'>
        E-Commerce App
      </NavBarBootstrap.Brand>
      <NavBarBootstrap.Toggle aria-controls='basic-navbar-nav' />
      <NavBarBootstrap.Collapse id='basic-navbar-nav'>
        <NavDropdown bsPrefix='dropdown' className='dropdown' title='Filter'>
          <NavDropdown.Item className='dropdown-item'>All</NavDropdown.Item>
          <NavDropdown.Item className='dropdown-item'>
            T-shirts
          </NavDropdown.Item>
          <NavDropdown.Item className='dropdown-item'>Pants</NavDropdown.Item>
          <NavDropdown.Item className='dropdown-item'>Jackets</NavDropdown.Item>
        </NavDropdown>

        <div className='right-side'>
          <h5>Cart Sign in</h5>
        </div>
      </NavBarBootstrap.Collapse>
    </NavBarBootstrap>
  );
};

export default Navbar;
