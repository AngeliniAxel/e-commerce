import React from 'react';
import {
  Navbar as NavBarBootstrap,
  NavDropdown,
  Dropdown,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserData } from '../../../slices/userSlice';
import './Navbar.scss';

const Navbar = () => {
  const user = useSelector(selectUserData);

  const handleSignIn = async () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const handleLogOut = async () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };

  return (
    <NavBarBootstrap fixed='top' expand='lg' className='nav'>
      <NavBarBootstrap.Brand>
        <Link className='brand' to='/'>
          E-Commerce App
        </Link>
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
          {user === null ? (
            <button onClick={handleSignIn}>Sign In</button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </NavBarBootstrap.Collapse>
    </NavBarBootstrap>
  );
};

export default Navbar;
