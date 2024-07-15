import admin from 'firebase-admin';
import { updateTransactionStatus } from '../../lib/database';

// Inisialisasi Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: 'YOUR_PROJECT_ID',
            clientEmail: 'YOUR_CLIENT_EMAIL',
            privateKey: 'YOUR_PRIVATE_KEY',
        }),
    });
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const notification = req.body;
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;

        // Logika untuk memproses notifikasi
        switch (transactionStatus) {
            case 'settlement':
                await updateTransactionStatus(orderId, 'settlement');
                console.log('Transaksi berhasil:', notification);
                break;
            case 'pending':
                await updateTransactionStatus(orderId, 'pending');
                console.log('Transaksi pending:', notification);
                break;
            case 'deny':
                await updateTransactionStatus(orderId, 'deny');
                console.log('Transaksi ditolak:', notification);
                break;
            case 'expire':
                await updateTransactionStatus(orderId, 'expire');
                console.log('Transaksi kadaluarsa:', notification);
                break;
            case 'cancel':
                await updateTransactionStatus(orderId, 'cancel');
                console.log('Transaksi dibatalkan:', notification);
                break;
            default:
                console.log('Status transaksi tidak dikenal:', transactionStatus);
        }

        // Kirim notifikasi FCM
        const message = {
            notification: {
                title: 'Status Pembayaran',
                body: `Status pembayaran Anda: ${transactionStatus}`,
            },
            topic: orderId, // Menggunakan orderId sebagai topic
        };

        try {
            await admin.messaging().send(message);
            console.log('Notifikasi FCM terkirim');
        } catch (error) {
            console.error('Error mengirim notifikasi FCM:', error);
        }

        res.status(200).json({ message: 'Notification received and transaction status updated' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
