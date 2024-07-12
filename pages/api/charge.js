// pages/api/charge.js
export default function handler(req, res) {
  if (req.method === "POST") {
    // Logika penanganan permintaan transaksi
    res.status(200).json({ message: "Charge endpoint received the request" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
