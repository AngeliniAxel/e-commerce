import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const handleAddToCart = async () => {
    if (user) {
      const cartData = await axios.get(`/api/cart/${user.id}`);
      const cartId = cartData.data[0].id;

      await axios.post(`/api/cart_products/${cartId}`, {
        product_id: product.id,
        quantity: quantity,
        price_each: product.price,
      });
      history.replace('/cart');
    } else {
      window.open('/auth/google', '_self');
    }
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
