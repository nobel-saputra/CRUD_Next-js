// backend/server.js
require("dotenv").config(); // Muat variabel lingkungan dari .env

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000; // Gunakan port dari env jika ada, default 5000

// Inisialisasi Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Gunakan service_role key untuk backend
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- API Routes (CRUD) ---

// CREATE (Menambah item baru)
app.post("/api/items", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
  }

  try {
    const { data, error } = await supabase
      .from("items") // Nama tabel di Supabase
      .insert([{ name, description }])
      .select(); // Mengambil data yang baru saja dimasukkan

    if (error) {
      console.error("Error inserting item:", error);
      return res.status(500).json({ message: "Gagal menambah item", error: error.message });
    }
    res.status(201).json(data[0]); // Supabase mengembalikan array, kita ambil item pertama
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// READ (Mendapatkan semua item)
app.get("/api/items", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items") // Nama tabel di Supabase
      .select("*"); // Mengambil semua kolom

    if (error) {
      console.error("Error fetching items:", error);
      return res.status(500).json({ message: "Gagal mengambil item", error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// READ (Mendapatkan item berdasarkan ID) - Jika menggunakan UUID di Supabase, ID akan string
app.get("/api/items/:id", async (req, res) => {
  const id = req.params.id; // ID mungkin string jika UUID
  try {
    const { data, error } = await supabase.from("items").select("*").eq("id", id); // Mengambil item berdasarkan kolom 'id'

    if (error) {
      console.error("Error fetching single item:", error);
      return res.status(500).json({ message: "Gagal mengambil item", error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }
    res.json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// UPDATE (Memperbarui item berdasarkan ID)
app.put("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
  }

  try {
    const { data, error } = await supabase.from("items").update({ name, description }).eq("id", id).select(); // Mengambil data yang baru saja diperbarui

    if (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({ message: "Gagal memperbarui item", error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan atau tidak ada perubahan." });
    }
    res.json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// DELETE (Menghapus item berdasarkan ID)
app.delete("/api/items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { error, count } = await supabase.from("items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting item:", error);
      return res.status(500).json({ message: "Gagal menghapus item", error: error.message });
    }
    // Supabase delete doesn't return data, but a count of affected rows.
    if (count === 0) {
      // Jika tidak ada baris yang terpengaruh, berarti item tidak ditemukan
      return res.status(404).json({ message: "Item tidak ditemukan." });
    }
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Backend server berjalan di http://localhost:${PORT}`);
  console.log(`Supabase URL: ${supabaseUrl}`);
});
