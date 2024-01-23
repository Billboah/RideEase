import { carList } from "../../../Components/data/carList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Car {
  imgUrl: string;
  service: string;
  multiplier: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  const { selectedCar, rideDuration, pick_up, drop_off } = req.body;
  const car: Car | undefined = carList.find(
    (obj) => obj.service === selectedCar
  );

  if (req.method === "POST") {
    if (!userSession) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    try {
      if (!car) {
        res
          .status(401)
          .json({ message: "Sorry! The car you selected is not in service." });
        return;
      }

      const carPrice = Number((rideDuration * car.multiplier).toFixed(2));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: carPrice * 100,
              product_data: {
                description: `You have ordered ${selectedCar} and it will be around in 5 minutes`,
                name: selectedCar,
                images: [car.imgUrl],
              },
            },
          },
        ],
        mode: "payment",
        metadata: {
          email: userSession.user.email,
          images: [car.imgUrl],
          name: selectedCar,
          pick_up: pick_up,
          drop_off: drop_off,
        },
        success_url: `${req.headers.origin}/success/?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(201).json({ sessionId: session.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
