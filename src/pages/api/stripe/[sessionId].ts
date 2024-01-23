import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  const { sessionId } = req.query;

  if (req.method === "GET") {
    if (!userSession) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.status(200).json(session);
    } catch (error: any) {
      console.error("Error retrieving session:", error);
      res.status(500).json({ error: "Failed to retrieve session" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
