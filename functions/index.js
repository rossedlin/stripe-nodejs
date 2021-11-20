const env       = require('./.env.json');
const functions = require('firebase-functions');
const stripe    = require('stripe')(env.stripe_sk);
const app       = require('express')();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: env.price_id,
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
