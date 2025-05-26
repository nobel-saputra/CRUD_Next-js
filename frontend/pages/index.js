// frontend/pages/index.js
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api/items"; // Ganti jika port backend berbeda

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [editingItem, setEditingItem] = useState(null); // Item yang sedang diedit

  // Fungsi untuk mengambil semua item dari backend
  const fetchItems = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Panggil fetchItems saat komponen pertama kali dimuat
  useEffect(() => {
    fetchItems();
  }, []);

  // Fungsi untuk menambah atau memperbarui item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItemName || !newItemDescription) {
      alert("Nama dan Deskripsi harus diisi!");
      return;
    }

    const itemData = {
      name: newItemName,
      description: newItemDescription,
    };

    if (editingItem) {
      // Logika UPDATE
      try {
        const response = await fetch(`${API_BASE_URL}/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });
        if (response.ok) {
          setNewItemName("");
          setNewItemDescription("");
          setEditingItem(null); // Selesai mengedit
          fetchItems(); // Refresh daftar item
        } else {
          console.error("Failed to update item");
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      // Logika CREATE
      try {
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });
        if (response.ok) {
          setNewItemName("");
          setNewItemDescription("");
          fetchItems(); // Refresh daftar item
        } else {
          console.error("Failed to add item");
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  // Fungsi untuk memulai mode edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setNewItemDescription(item.description);
  };

  // Fungsi untuk menghapus item
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        // 204 No Content for successful deletion
        fetchItems(); // Refresh daftar item
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Aplikasi CRUD Sederhana</h1>

      <h2>{editingItem ? "Edit Item" : "Tambah Item Baru"}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="itemName" style={{ display: "block", marginBottom: "5px" }}>
            Nama Item:
          </label>
          <input type="text" id="itemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="itemDescription" style={{ display: "block", marginBottom: "5px" }}>
            Deskripsi:
          </label>
          <textarea id="itemDescription" value={newItemDescription} onChange={(e) => setNewItemDescription(e.target.value)} style={{ width: "100%", padding: "8px", boxSizing: "border-box", minHeight: "60px" }} required></textarea>
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          {editingItem ? "Perbarui Item" : "Tambah Item"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setNewItemName("");
              setNewItemDescription("");
            }}
            style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Batal
          </button>
        )}
      </form>

      <h2>Daftar Item</h2>
      {items.length === 0 ? (
        <p>Tidak ada item. Tambahkan item baru!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ border: "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{item.name}</strong>
                <p style={{ margin: "5px 0 0 0", fontSize: "0.9em", color: "#555" }}>{item.description}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(item)} style={{ padding: "8px 12px", backgroundColor: "#ffc107", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "5px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
