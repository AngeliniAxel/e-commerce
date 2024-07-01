import React from 'react';
import {
  Navbar as NavBarBootstrap,
  NavDropdown,
  Dropdown,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter } from '../../../slices/productsSlice';
import { selectUserData } from '../../../slices/userSlice';
import './Navbar.scss';

const Navbar = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    //dispatch(fetchUserData());
    window.open('http://localhost:5000/auth/google', '_self');
  };

  const handleLogOut = async () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    dispatch(setFilter(e.target.value));
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
          <NavDropdown.Item
            onClick={handleFilterChange}
            value='all'
            className='dropdown-item'
            as='button'
          >
            All
          </NavDropdown.Item>
          <NavDropdown.Item
            value='T-shirt'
            onClick={handleFilterChange}
            className='dropdown-item'
            as='button'
          >
            T-shirts
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={handleFilterChange}
            value='Pants'
            className='dropdown-item'
            as='button'
          >
            Pants
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={handleFilterChange}
            value='Jacket'
            className='dropdown-item'
            as='button'
          >
            Jackets
          </NavDropdown.Item>
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
                    style={{ textDecoration: 'none', color: 'green' }}
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
