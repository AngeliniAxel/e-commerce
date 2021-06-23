import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './app/components/Navbar/Navbar';
import Footer from './app/components/Footer/Footer';
import Home from './app/components/Home/Home';
import Cart from './app/components/Cart/Cart';
import SingleProduct from './app/components/SingleProduct/SingleProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from './slices/productsSlice';
import { Switch, Route } from 'react-router-dom';
import { setUserData } from './slices/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetch('http://localhost:5000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }).then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      });
      dispatch(setUserData(data.user));
    };
    dispatch(fetchProducts());
    fetchUserData();
  }, [dispatch]);

  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/product/:id' exact component={SingleProduct} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
