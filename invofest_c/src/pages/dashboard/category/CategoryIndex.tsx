import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari backend getCategories
  const fetchCategories = async () => {
    try {
      // PERBAIKAN URL 1: Mengarah ke /categories sesuai endpoint asli backend
      const response = await fetch("https://syifa-backend.vercel.app/categories");
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
      const data = await response.json();
      
      // Jika backend me-return array langsung, pasang ke state
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

const handleDelete = async (id: number, name: string) => {
    if (confirm(`Yakin ingin menghapus kategori "${name}"?`)) {
      try {
      
        const response = await fetch(`https://syifa-backend.vercel.app/categories/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus kategori di server");
        }

        alert("Data category berhasil dihapus");
        fetchCategories(); 
      } catch (error: any) {
        console.error(error);
        alert(error.message || "Gagal menghapus kategori");
      }
    }
  };

  return (
    <div className="p-6 w-full flex-1"> 
      <div className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-2xl font-bold text-red-900">Category</h1>
        <p className="text-gray-600">Daftar kategori yang tersedia</p>

        <Link
          to="/dashboard/category/create"
          className="mt-4 bg-red-900 hover:bg-red-800 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm font-bold"
        >
          <span className="text-lg font-bold">+</span> Tambah Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full min-w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="p-4 w-4/5">Nama Kategori</th>
              <th className="p-4 text-center w-1/5">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400 italic">
                  Sedang mengambil data dari database...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400 italic">
                  Belum ada data kategori.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-red-50 transition">
                  {/* Memastikan data dirender dengan 'cat.name' huruf kecil */}
                  <td className="p-4 text-gray-800 wrap-break-word">{cat.name}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to="/dashboard/category/edit"
                        state={{ category: cat }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition inline-block"
                      >
                        Edit
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}