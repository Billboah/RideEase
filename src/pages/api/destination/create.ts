import Destination from '../../../models/destination'
import db from '../../../lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db()
  const userSession = await getServerSession(req, res, authOptions)

  if (req.method === 'POST') {
    if (!userSession) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }

    try {
      const { pickup, dropoff } = req.body

      if (!pickup || !dropoff) {
        return res
          .status(400)
          .json({ error: 'Pickup and drop-off Destinations are required' })
      }

      const existingDestination = await Destination.findOne({
        user: userSession.user.id,
        pickup,
        dropoff,
      })

      if (existingDestination) {
        return res
          .status(400)
          .json({ error: 'Destination already exists in the database' })
      }

      const newDestination = await Destination.create({
        user: userSession.user.id,
        pickup,
        dropoff,
      })

      res.status(201).json(newDestination)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
