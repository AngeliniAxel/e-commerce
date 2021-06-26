const router = require('express').Router();
const pool = require('../database/db');
const queries = require('../database/queries');

//Find the cart with the user id, if it doesnt exist, creates it
router.get('/:userid', async (req, res) => {
  const cart = await queries.findOrCreateCart(req.params.userid);
  res.send(cart);
});

module.exports = router;
