import db from "@/lib/db";
import paymentsession from "@/models/paymentsession";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
db();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let event = req.body;

    if (endpointSecret) {
      const sig = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session) {
        console.log(`session was created: ${session}`);
      }

      console.log(session);

      if (session.metadata && session.amount_total && session.metadata.email) {
        try {
          const database_data = {
            price: session.amount_total / 100,
            user_email: session.metadata.email,
            images: JSON.parse(session.metadata.car_images),
            uber_type: session.metadata.name,
            pick_up: session.metadata.pick_up,
            drop_off: session.metadata.drop_off,
          };

          await paymentsession.create(database_data);

          console.log(`SUCCESS: Order ${session.id} has been added to DB`);
        } catch (error) {
          console.error("Error adding order to DB:", error);
        }
      } else {
        console.log("Internal surface error");
      }
    }
    res.status(200).end();
  }
}
