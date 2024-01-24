import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import paymentsession from "@/models/paymentsession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db();
  const userSession = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    if (!userSession) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    const userEmail = userSession.user.email;

    try {
      const paymentSession = await paymentsession
        .find({ user_email: userEmail })
        .sort({
          updatedAt: -1,
        });

      res.status(200).json(paymentSession);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
