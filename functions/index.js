const functions = require('firebase-functions');
const stripe    = require('stripe')(functions.config().stripe.sk);
const app       = require('express')();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: functions.config().stripe.price,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://stripe-node.edlin.app/success.html`,
    cancel_url: `https://stripe-node.edlin.app/`,
  });

  res.redirect(303, session.url);
});

exports.app = functions.https.onRequest(app);
