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

module.exports = router;
