import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import img from '../../../images/images';
import './Product.scss';

const Product = ({ product }) => {
  console.log(product);
  return (
    <Card className='card' style={{ width: '18rem' }}>
      <Card.Img variant='top' src={img[product.img]} />
      <Card.Body className='card-body'>
        <Card.Title className='card-title'>{product.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className='card-button' variant='primary'>
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
