import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductsList } from '../../../slices/productsSlice';
import img from '../../../images/images';
import './SingleProduct.scss';
import { Button } from 'react-bootstrap';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined);
  const productsList = useSelector(selectProductsList);

  useEffect(() => {
    const fetchedProduct = productsList.find((item) => item.id == id);
    setProduct(fetchedProduct);
  }, [productsList]);
  return (
    <div>
      {product !== undefined && (
        <div className='single-product-wrapper'>
          <img className='img-product-single' src={img[product.img]} />
          <div className='product-details'>
            <h1>
              {product.name} {product.style} {product.color}
            </h1>
            <h3>Price: {product.price}</h3>
            <div className='qty'>
              <span>Quantity: </span>
              <select name='select'>
                {[...Array(product.stock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <Button className='btn-to-cart'>Add to Cart</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
