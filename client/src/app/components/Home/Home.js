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
  /*   const dispatch = useDispatch();

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

  useEffect(() => {
    fetchUserData();
  }, []); */

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
