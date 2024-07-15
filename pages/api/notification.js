// /pages/api/notification.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;
    
    // Logika untuk memproses notifikasi
    if (notification.transaction_status === 'settlement') {
      // Transaksi berhasil
      console.log('Transaksi berhasil:', notification);
    } else {
      console.log('Status transaksi:', notification.transaction_status);
    }
    
    res.status(200).json({ message: 'Notification received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
