const router = require('express').Router();
const pool = require('../database/db');
const queries = require('../database/queries');

//Find the cart with the user id, if it doesnt exist, creates it
router.get('/:userid', async (req, res) => {
  const cart = await queries.findOrCreateCart(req.params.userid);
  res.send(cart);
});

//set a product with an id cart
router.post('/:id', async (req, res) => {
  try {
    const { product_id, quantity, price_each } = req.body;
    const data = await pool.query(
      'INSERT INTO cart_products VALUES ($1, $2, $3, $4)',
      [req.params.id, product_id, quantity, price_each]
    );
    res.send(data);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
