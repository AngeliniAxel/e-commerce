import React from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../../slices/userSlice';
import { Table, Button } from 'react-bootstrap';
import img from '../../../images/images';
import './Cart.scss';

const Cart = () => {
  const cart = useSelector(selectCart);
  const totalQty = cart.reduce(
    (itemA, itemB) => itemA.quantity + itemB.quantity
  );
  const totalPrice = cart.reduce(
    (itemA, itemB) =>
      itemA.quantity * itemA.price + itemB.quantity * itemB.price
  );

  return (
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
                    <img src={img[item.img]} alt={item.name} height='100px' />
                  </td>
                  <td>
                    {item.name} {item.style} {item.color}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>delete</td>
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
          <span style={{ 'font-weight': 'bold' }}>Buy</span> (not really, just
          and academic project)
        </Button>
      </div>
    </div>
  );
};

export default Cart;
