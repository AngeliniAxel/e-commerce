import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../../images/images';
import './Product.scss';

const Product = ({ product }) => {
  return (
    <Link className='card-link' to={`product/${product.id}`}>
      <Card className='card' style={{ width: '18rem' }}>
        <Card.Img variant='top' src={img[product.img]} />
        <Card.Body className='card-body'>
          <Card.Title className='card-title'>
            {product.name} {product.style} {product.color}
          </Card.Title>
          <Card.Text>${product.price},00</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
