const router = require('express').Router();
const pool = require('../database/db');

//Find the cart with the products
router.get('/:cartid', async (req, res) => {
  const cart = await pool.query(
    'SELECT * FROM cart_products JOIN products ON products.id = cart_products.product_id AND cart_id = $1',
    [req.params.cartid]
  );
  res.send(cart);
});

router.post('/:cartId', async (req, res) => {
  try {
    const { product_id, quantity, price_each } = req.body;
    const data = await pool.query(
      'INSERT INTO cart_products VALUES ($1, $2, $3, $4)',
      [req.params.cartId, product_id, quantity, price_each]
    );
    res.send(data);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const data = await pool.query(
      'DELETE FROM cart_products WHERE product_id = $1',
      [req.params.productId]
    );
    res.send(data);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
