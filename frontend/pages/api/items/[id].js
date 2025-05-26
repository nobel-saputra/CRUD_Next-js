// frontend/pages/api/items/[id].js
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  const { id } = req.query; // Mengambil ID dari URL dinamis

  if (req.method === "GET") {
    // READ (Mendapatkan item berdasarkan ID)
    try {
      const { data, error } = await supabase.from("items").select("*").eq("id", id);

      if (error) {
        console.error("Error fetching single item:", error);
        return res.status(500).json({ message: "Gagal mengambil item", error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Item tidak ditemukan." });
      }
      res.status(200).json(data[0]);
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  } else if (req.method === "PUT") {
    // UPDATE (Memperbarui item berdasarkan ID)
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Nama dan deskripsi harus diisi." });
    }

    try {
      const { data, error } = await supabase.from("items").update({ name, description }).eq("id", id).select();

      if (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ message: "Gagal memperbarui item", error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Item tidak ditemukan atau tidak ada perubahan." });
      }
      res.status(200).json(data[0]);
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  } else if (req.method === "DELETE") {
    // DELETE (Menghapus item berdasarkan ID)
    try {
      const { error, count } = await supabase.from("items").delete().eq("id", id);

      if (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ message: "Gagal menghapus item", error: error.message });
      }
      if (count === 0) {
        return res.status(404).json({ message: "Item tidak ditemukan." });
      }
      res.status(204).send(); // 204 No Content for successful deletion
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  } else {
    // Metode HTTP tidak diizinkan
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
