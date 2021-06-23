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

    //find the product with that cartId and product_id-
    const fetchedProduct = await pool.query(
      'SELECT * FROM public.cart_products WHERE cart_id = $1 AND product_id = $2;',
      [req.params.cartId, product_id]
    );

    //if it dont exist, creates it
    if (!fetchedProduct.rowCount) {
      const data = await pool.query(
        'INSERT INTO cart_products VALUES ($1, $2, $3, $4)',
        [req.params.cartId, product_id, quantity, price_each]
      );
      res.send('no se encontro');
    } else {
      // if it exists, updates its quantity
      const newQty =
        parseInt(fetchedProduct.rows[0].quantity) + parseInt(quantity);

      const data = await pool.query(
        'UPDATE public.cart_products SET quantity = $1 WHERE cart_id = $2 AND product_id = $3;',
        [newQty, req.params.cartId, product_id]
      );

      res.sendStatus(202);
    }
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
