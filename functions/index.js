const functions = require("firebase-functions");
const stripe    = require('stripe')('STRIPE_SECRET_KEY');
const app       = require('express')();

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'PRICE_ID',
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: 'https://stripe-node-234ef.web.app/',
        cancel_url: 'https://stripe-node-234ef.web.app/'
    });

    res.redirect(303, session.url);
});

exports.app = functions.https.onRequest(app);
