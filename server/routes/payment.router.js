const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51LgN3XGgp3GmJutylJb1ddRJLyrnofCLcRyJEO25EQrpANTlgqGSI94nF3C3CQHqPsQIh540TXtK2Fyc4hRsnAh600tKpD6eLE');

router.post("/shipping", (req, res) => {
  res.send({
    shippingData: req.body
  })
})

module.exports = router;