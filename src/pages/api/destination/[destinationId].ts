import Destination from '../../../models/destination'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import db from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db()
  const userSession = await getServerSession(req, res, authOptions)
  const { destinationId } = req.query

  if (req.method === 'DELETE') {
    if (!userSession) {
      res.status(401).json({ message: 'You must be logged in.' })
      return
    }
    try {
      const existingMessage = await Destination.findOne({ _id: destinationId })

      if (!existingMessage) {
        res.status(404).json({ message: 'Message not found' })
        return
      }

      if (existingMessage.user.toString() !== userSession.user.id) {
        res
          .status(404)
          .json({ message: 'You are not allowed to delete this message' })
        return
      }

      await Destination.deleteOne({ _id: destinationId })

      res.status(200).json({ message: 'Destination Deleted' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
