import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CategoryType {
  id: number; 
  name: string;
}

export default function CategoryEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [categoryId, setCategoryId] = useState<number | string>("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const stateData = location.state as { category: CategoryType } | null;

    if (stateData && stateData.category) {
      setCategoryId(stateData.category.id);
      setCategoryName(stateData.category.name);
    } else {
      navigate("/dashboard/category");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim() || !categoryId) return;

    try {
    
      const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName, 
        }),
      });

      // Validasi respons
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Gagal mengupdate kategori");
      }

      alert("Data category berhasil diupdate");
      navigate("/dashboard/category");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="p-6 w-full max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-900">Edit Category</h1>
        <p className="text-gray-600 text-sm">Ubah nama kategori pilihan Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            Nama Kategori
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition"
            placeholder="Contoh: Web Development"
            required
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg font-bold shadow-sm transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}