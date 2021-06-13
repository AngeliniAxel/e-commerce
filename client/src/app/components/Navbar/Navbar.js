import React from 'react';
import {
  Navbar as NavBarBootstrap,
  NavDropdown,
  Dropdown,
  Button,
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
            <Button variant='success' onClick={handleSignIn}>
              Sign In
            </Button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                className='login-button'
                variant='success'
                id='dropdown-basic'
              >
                <img
                  className='profile-img'
                  src={user.img}
                  alt='Profile img'
                  height='25px'
                />{' '}
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    style={{ 'text-decoration': 'none', color: 'green' }}
                    to='/cart'
                  >
                    Cart
                  </Link>
                </Dropdown.Item>

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
