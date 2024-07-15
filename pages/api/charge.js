import fetch from 'node-fetch';
import { Buffer } from 'buffer';

export default function handler(req, res) {
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

  const handleNotification = async (req) => {
    const notification = req.body;
    console.log('Midtrans Notification:', notification);

    // Logika untuk menangani notifikasi dari Midtrans
    if (notification.transaction_status === 'settlement') {
      // Update status transaksi di database Anda menjadi sukses
      console.log('Transaction settled:', notification.order_id);
    } else if (notification.transaction_status === 'pending') {
      // Update status transaksi di database Anda menjadi pending
      console.log('Transaction pending:', notification.order_id);
    } else if (notification.transaction_status === 'deny') {
      // Update status transaksi di database Anda menjadi deny
      console.log('Transaction denied:', notification.order_id);
    } else if (notification.transaction_status === 'expire') {
      // Update status transaksi di database Anda menjadi expire
      console.log('Transaction expired:', notification.order_id);
    } else if (notification.transaction_status === 'cancel') {
      // Update status transaksi di database Anda menjadi cancel
      console.log('Transaction canceled:', notification.order_id);
    }
  };

  if (req.method === 'POST') {
    const requestBody = JSON.stringify(req.body);

    if (req.headers['x-callback-token']) {
      // Ini adalah permintaan notifikasi dari Midtrans
      handleNotification(req)
        .then(() => res.status(200).send('Notification handled'))
        .catch(error => res.status(500).json({ message: error.message }));
    } else {
      // Ini adalah permintaan untuk charge
      chargeAPI(apiUrl, serverKey, requestBody)
        .then(result => res.status(result.http_code).json(result.body))
        .catch(error => res.status(500).json({ message: error.message }));
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
