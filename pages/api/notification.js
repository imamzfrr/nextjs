// pages/api/notification.js

import { Buffer } from 'buffer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;
    console.log('Midtrans Notification:', notification);

    // Logika untuk memproses notifikasi
    switch (notification.transaction_status) {
      case 'settlement':
        console.log('Transaksi berhasil:', notification);
        break;
      case 'pending':
        console.log('Transaksi pending:', notification);
        break;
      case 'deny':
        console.log('Transaksi ditolak:', notification);
        break;
      case 'expire':
        console.log('Transaksi kadaluarsa:', notification);
        break;
      case 'cancel':
        console.log('Transaksi dibatalkan:', notification);
        break;
      default:
        console.log('Status transaksi tidak dikenal:', notification.transaction_status);
    }

    res.status(200).json({ message: 'Notification received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
