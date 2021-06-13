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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
