import { useEffect } from 'react';
import socketIo from 'socket.io-client';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [transactionUpdate, setTransactionUpdate] = useState(null);

    useEffect(() => {
        const socket = socketIo();

        socket.on('transaction-update', (data) => {
            console.log('Transaction Update:', data);
            setTransactionUpdate(data);
            // Tambahkan logika untuk menangani pembaruan, seperti memperbarui state atau menampilkan notifikasi
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return <Component {...pageProps} transactionUpdate={transactionUpdate} />;
}

export default MyApp;
