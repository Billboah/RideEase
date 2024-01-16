import { NextApiRequest, NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let event = req.body

    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature']
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        )
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return res.status(400)
      }
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        //const paymentIntent = event.data.object
        console.log(
          `PaymentIntent for ${event.data.object.amount} was successful!`,
        )
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      case 'payment_method.attached':
        //const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        console.log(`PaymentAttarched for ${event.data.object} was successful!`)
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    res.status(400)
  }
}
