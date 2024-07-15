// pages/api/notification.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const notificationData = req.body;

    // Log or process the notification data as needed
    console.log('Received notification:', notificationData);

    // Always respond with HTTP 200 status to acknowledge the notification
    res.status(200).json({ message: 'Notification received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
