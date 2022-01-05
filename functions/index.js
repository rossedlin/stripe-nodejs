const functions   = require('firebase-functions');
const stripe_test = require('stripe')(functions.config().stripe.test_sk);
const stripe_live = require('stripe')(functions.config().stripe.live_sk);
const app         = require('express')();

app.post('/create-test-checkout-session', async (req, res) => {
  const session = await stripe_test.checkout.sessions.create({
    line_items:  [
      {
        price:    functions.config().stripe.test_price,
        quantity: 1,
      },
    ],
    mode:        'payment',
    success_url: `https://stripe-node.edlin.app/`,
    cancel_url:  `https://stripe-node.edlin.app/`,
  });

  res.redirect(303, session.url);
});

app.post('/create-live-checkout-session', async (req, res) => {
  const session = await stripe_live.checkout.sessions.create({
    line_items:  [
      {
        price:    functions.config().stripe.live_price,
        quantity: 1,
      },
    ],
    mode:        'payment',
    success_url: `https://stripe-node.edlin.app/`,
    cancel_url:  `https://stripe-node.edlin.app/`,
  });

  res.redirect(303, session.url);
});

exports.app = functions.https.onRequest(app);
