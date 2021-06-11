import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  selectProductsList,
  selectProductsStatus,
} from '../../../slices/productsSlice';
import Product from '../Product/Product';
import './Home.scss';

const Home = () => {
  const productsList = useSelector(selectProductsList);
  const productStatus = useSelector(selectProductsStatus);
  return (
    <div className='wrapper'>
      {productStatus === 'loading' && (
        <Spinner animation='border' variant='success' />
      )}
      {productStatus === 'succeeded' &&
        productsList.map((item) => <Product key={item.id} product={item} />)}
    </div>
  );
};

export default Home;
