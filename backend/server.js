// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Pastikan ini diimpor

const app = express();
const PORT = 5000; // Port untuk backend

// Middleware
app.use(cors()); // Izinkan semua origin. Untuk produksi, batasi ke domain frontend Anda.
app.use(bodyParser.json()); // Untuk mengurai body permintaan JSON

// Contoh data sementara (anggap ini sebagai database)
let items = [
  { id: 1, name: "Buku", description: "Buku pelajaran sejarah" },
  { id: 2, name: "Pensil", description: "Pensil 2B" },
  { id: 3, name: "Penghapus", description: "Penghapus warna putih" },
];

let nextId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

// --- API Routes (CRUD) ---

// CREATE (Menambah item baru)
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
  }
  const newItem = { id: nextId++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// READ (Mendapatkan semua item)
app.get("/api/items", (req, res) => {
  res.json(items);
});

// READ (Mendapatkan item berdasarkan ID)
app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ message: "Item tidak ditemukan." });
  }
  res.json(item);
});

// UPDATE (Memperbarui item berdasarkan ID)
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item tidak ditemukan." });
  }
  if (!name || !description) {
    return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
  }

  items[itemIndex] = { ...items[itemIndex], name, description };
  res.json(items[itemIndex]);
});

// DELETE (Menghapus item berdasarkan ID)
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = items.length;
  items = items.filter((item) => item.id !== id);

  if (items.length === initialLength) {
    return res.status(404).json({ message: "Item tidak ditemukan." });
  }
  res.status(204).send(); // 204 No Content for successful deletion
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Backend server berjalan di http://localhost:${PORT}`);
});
