import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  selectProductsFilter,
  selectProductsList,
  selectProductsStatus,
} from '../../../slices/productsSlice';
import Product from '../Product/Product';
import './Home.scss';

const Home = () => {
  const productsList = useSelector(selectProductsList);
  const productStatus = useSelector(selectProductsStatus);
  const productsFilter = useSelector(selectProductsFilter);

  return (
    <div className='wrapper'>
      {productStatus === 'loading' && (
        <Spinner animation='border' variant='success' />
      )}
      {productStatus === 'succeeded' &&
        // eslint-disable-next-line array-callback-return
        productsList.map((item) => {
          if (productsFilter === 'all') {
            return <Product key={item.id} product={item} />;
          } else if (productsFilter === item.name) {
            return <Product key={item.id} product={item} />;
          }
        })}
    </div>
  );
};

export default Home;
