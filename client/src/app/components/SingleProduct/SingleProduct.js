import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductsList } from '../../../slices/productsSlice';
import img from '../../../images/images';
import './SingleProduct.scss';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { selectUserData } from '../../../slices/userSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const user = useSelector(selectUserData);
  const [product, setProduct] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const productsList = useSelector(selectProductsList);

  const handleAddToCart = async () => {
    const data = await axios.post(`http://localhost:5000/api/cart/${user.id}`, {
      product_id: product.id,
      quantity: quantity,
      price_each: product.price,
    });
    console.log(data);
  };

  useEffect(() => {
    const fetchedProduct = productsList.find(
      (item) => item.id === parseInt(id)
    );
    setProduct(fetchedProduct);
  }, [id, productsList]);

  return (
    <div>
      {product !== undefined && (
        <div className='single-product-wrapper'>
          <img
            className='img-product-single'
            src={img[product.img]}
            alt={product.name}
          />
          <div className='product-details'>
            <h1>
              {product.name} {product.style} {product.color}
            </h1>
            <h3>Price: ${product.price * quantity},00</h3>
            <div className='qty'>
              <span>Quantity: </span>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setQuantity(e.target.value);
                }}
                name='select'
                value={quantity}
              >
                {[...Array(product.stock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleAddToCart} className='btn-to-cart'>
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
