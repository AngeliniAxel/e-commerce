import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import img from '../../../images/images';
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
      {productStatus === 'succeeded' &&
        productsList.data.map((item) => (
          <Product key={item.id} product={item} />
        ))}
    </div>
  );
};

export default Home;
