// /pages/api/charge.js

import fetch from 'node-fetch';
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  const serverKey = 'SB-Mid-server-7kRmSxtejJcnziEVnW6aW1VS'; // Ganti dengan server key Anda
  const apiUrl = 'https://app.sandbox.midtrans.com/snap/v1/transactions'; // URL API sandbox

  const chargeAPI = async (apiUrl, serverKey, requestBody) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(serverKey + ':').toString('base64')
        },
        body: requestBody
      });

      const data = await response.json();
      return { body: data, http_code: response.status };
    } catch (error) {
      throw new Error('Error in API call: ' + error.message);
    }
  };

  if (req.method === 'POST') {
    const requestBody = JSON.stringify(req.body);

    try {
      const result = await chargeAPI(apiUrl, serverKey, requestBody);
      res.status(result.http_code).json(result.body);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ message: 'Server is up and running!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
