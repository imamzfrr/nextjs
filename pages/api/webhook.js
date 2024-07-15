// pages/api/webhook.js
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    const secret = process.env.SB-Mid-server-7kRmSxtejJcnziEVnW6aW1VS; // Your Midtrans server key
    const signatureKey = req.headers['x-midtrans-signature-key'];

    // Validate the signature
    const hmac = crypto.createHmac('sha512', secret);
    hmac.update(JSON.stringify(req.body));
    const expectedSignature = hmac.digest('hex');

    if (signatureKey === expectedSignature) {
      const { transaction_status, order_id } = req.body;

      // Handle the transaction status
      switch (transaction_status) {
        case 'settlement':
          // Update your database to mark the transaction as successful
          break;
        case 'pending':
          // Handle pending status
          break;
        case 'deny':
        case 'expire':
        case 'cancel':
          // Handle failed transactions
          break;
        default:
          // Handle other statuses
          break;
      }

      res.status(200).json({ message: 'Webhook received and processed.' });
    } else {
      res.status(400).json({ message: 'Invalid signature.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
