export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const notification = req.body;
            console.log('Received Midtrans Notification:', notification);

            // Validate notification structure
            if (!notification.transaction_status) {
                console.error('Invalid notification format:', notification);
                return res.status(400).json({ message: 'Invalid notification format' });
            }

            // Process notification based on transaction status
            switch (notification.transaction_status) {
                case 'settlement':
                    console.log('Transaction success:', notification);
                    // Update transaction status in your database
                    break;
                case 'pending':
                    console.log('Transaction pending:', notification);
                    // Update transaction status in your database
                    break;
                case 'deny':
                    console.log('Transaction denied:', notification);
                    // Update transaction status in your database
                    break;
                case 'expire':
                    console.log('Transaction expired:', notification);
                    // Update transaction status in your database
                    break;
                case 'cancel':
                    console.log('Transaction cancelled:', notification);
                    // Update transaction status in your database
                    break;
                default:
                    console.log('Unknown transaction status:', notification.transaction_status);
            }

            // Respond with success
            return res.status(200).json({ message: 'Notification received and transaction status updated' });
        } catch (error) {
            console.error('Error processing notification:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
