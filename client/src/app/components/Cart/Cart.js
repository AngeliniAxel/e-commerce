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
    if (cart.length > 0) {
      const qty = cart.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      setTotalQty(qty);
      setTotalPrice(
        cart.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0)
      );
    }
  }, [cart]);

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

  useEffect(() => {
    if (user !== null) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  const handleDeteleClick = async ({ target }) => {
    await axios.delete(
      `http://localhost:5000/api/cart_products/${target.value}`
    );
    fetchCart();
  };

  return (
    <div>
      {' '}
      {user ? (
        <div>
          {cart !== undefined && (
            <div className='cart-wrapper'>
              <div>
                {cart.length > 0 ? (
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
                            <td>${item.price},00</td>
                            <td>{item.quantity}</td>
                            <td>
                              <Button
                                value={item.id}
                                onClick={handleDeteleClick}
                                variant='success'
                              >
                                delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h2>Cart empty</h2>
                )}
              </div>
              <div className='buy-wrapper'>
                <h1>
                  Subtotal ({totalQty} {totalQty > 1 ? 'items' : 'item'})
                </h1>
                <h3>Price: ${totalPrice},00</h3>
                <Button className='btn-to-cart'>
                  <span style={{ fontWeight: 'bold' }}>Buy</span> (not really,
                  just and academic project)
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        window.open('http://localhost:5000/auth/google', '_self')
      )}
    </div>
  );
};

export default Cart;
