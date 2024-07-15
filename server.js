const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIo(httpServer);

    server.use(express.json());

    // Route API notification
    server.post('/api/notification', async (req, res) => {
        const notification = req.body;
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;

        io.emit('transaction-update', { orderId, transactionStatus });

        // Logika untuk memproses notifikasi dan update database
        // ...

        res.status(200).json({ message: 'Notification received and transaction status updated' });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
});
