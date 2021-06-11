import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './app/components/Navbar/Navbar';
import Footer from './app/components/Footer/Footer';
import Home from './app/components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from './slices/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
