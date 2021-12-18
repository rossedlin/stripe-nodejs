const functions = require('firebase-functions');
const stripe    = require('stripe')(process.env.STRIPE_SK);
const app       = require('express')();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://stripe-node.web.app/success.html`,
    cancel_url: `https://stripe-node.web.app/cancel.html`,
  });

  res.redirect(303, session.url);
});

exports.app = functions.https.onRequest(app);
