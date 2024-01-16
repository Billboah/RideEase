import Destination from '../../../models/destination'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  db()
  const userSession = await getServerSession(req, res, authOptions)
  

  if (req.method === 'GET') {
    if (!userSession) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }

    const userId = userSession.user.id

    try {
      const destinations = await Destination.find({ user: userId }).sort({
        updatedAt: -1,
      })

      res.status(200).json(destinations)
    } catch (error: any) {
      res.status(500).json({ error: error.message})
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
