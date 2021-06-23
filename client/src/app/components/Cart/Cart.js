import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectUserData, setCart } from '../../../slices/userSlice';
import { Table, Button } from 'react-bootstrap';
import img from '../../../images/images';
import './Cart.scss';
import axios from 'axios';

const Cart = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(cart);
    if (cart.length > 0) {
      setTotalQty(
        cart.reduce((itemA, itemB) => itemA.quantity + itemB.quantity)
      );
      setTotalPrice(
        cart.reduce(
          (itemA, itemB) =>
            itemA.quantity * itemA.price + itemB.quantity * itemB.price
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      //find de cart id
      const cartData = await axios.get(
        `http://localhost:5000/api/cart/${user.id}`
      );
      const cartId = cartData.data[0].id;

      //with the id, select the cart in the other table, with the products id
      const cart = await axios.get(
        `http://localhost:5000/api/cart_products/${cartId}`
      );

      dispatch(setCart(cart.data.rows));
    };
    if (user !== null) {
      console.log(user);
      fetchCart();
    }
  }, [dispatch, user]);

  return (
    <div>
      {cart !== undefined && (
        <div className='cart-wrapper'>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={img[item.img]}
                          alt={item.name}
                          height='100px'
                        />
                      </td>
                      <td>
                        {item.name} {item.style} {item.color}
                      </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <Button variant='success'>delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className='buy-wrapper'>
            <h1>
              Subtotal ({totalQty} {totalQty > 1 ? 'items' : 'item'})
            </h1>
            <h3>Price: {totalPrice}</h3>
            <Button className='btn-to-cart'>
              <span style={{ fontWeight: 'bold' }}>Buy</span> (not really, just
              and academic project)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
