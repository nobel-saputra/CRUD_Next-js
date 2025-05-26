// frontend/pages/api/items.js
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
// Gunakan service_role key untuk API Routes di sisi server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Bisa pakai NEXT_PUBLIC karena di server
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // SERVICE_ROLE key yang rahasia
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    // READ (Mendapatkan semua item)
    try {
      const { data, error } = await supabase
        .from("items") // Nama tabel di Supabase
        .select("*");

      if (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ message: "Gagal mengambil item", error: error.message });
      }
      res.status(200).json(data);
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  } else if (req.method === "POST") {
    // CREATE (Menambah item baru)
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
    }

    try {
      const { data, error } = await supabase.from("items").insert([{ name, description }]).select();

      if (error) {
        console.error("Error inserting item:", error);
        return res.status(500).json({ message: "Gagal menambah item", error: error.message });
      }
      res.status(201).json(data[0]);
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  } else {
    // Metode HTTP tidak diizinkan
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
