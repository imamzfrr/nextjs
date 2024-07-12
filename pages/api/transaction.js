// pages/api/transaction.js
export default function handler(req, res) {
  if (req.method === "POST") {
    // Logika penanganan permintaan transaksi
    res
      .status(200)
      .json({ message: "Transaction endpoint received the request" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
