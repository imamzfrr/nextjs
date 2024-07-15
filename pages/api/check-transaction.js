// pages/api/check-transaction.js

let transactions = {}; // Ini harus disinkronkan dengan `notification.js`

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { order_id } = req.query;

        const transaction = transactions[order_id];

        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
