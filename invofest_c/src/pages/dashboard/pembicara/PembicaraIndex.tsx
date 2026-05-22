import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Pembicara {
  id: string | number;
  name: string;
  role: string;
  image?: string;
}

export default function PembicaraIndex() {
  const [pembicaraList, setPembicaraList] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPembicara = async () => {
    try {
      const response = await fetch("https://syifa-backend.vercel.app/pembicara");
      
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPembicaraList(data);
      } else if (data && typeof data === "object" && Array.isArray(data.data)) {
        setPembicaraList(data.data);
      }
    } catch (error) {
      console.error("Error fetch pembicara:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPembicara();
  }, []);

  const handleDelete = async (id: string | number, name: string) => {
    if (confirm(`Yakin ingin menghapus pembicara "${name}"?`)) {
      try {
        const response = await fetch(`https://syifa-backend.vercel.app/pembicara/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPembicara();
        }
      } catch (error) {
        console.error("Gagal menghapus pembicara:", error);
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-2xl font-bold text-red-900">Pembicara</h1>
        <p className="text-gray-600">Daftar pembicara yang tersedia</p>

        <Link
          to="/dashboard/pembicara/create"
          className="mt-4 bg-red-900 hover:bg-red-800 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg font-bold">+</span> Tambah Pembicara
        </Link>
      </div>

      {/* --- TABEL PEMBICARA --- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full mb-8">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="p-4 w-1/6">Foto</th>
              <th className="p-4 w-1/4">Nama Pembicara</th>
              <th className="p-4 w-2/4">Role / Jabatan</th>
              <th className="p-4 text-center w-1/4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400 italic">Sedang memuat data...</td>
              </tr>
            ) : pembicaraList.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400 italic">Belum ada data pembicara.</td>
              </tr>
            ) : (
              pembicaraList.map((pembicara) => (
                <tr key={pembicara.id} className="border-b hover:bg-red-50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                      {pembicara.image ? <img src={pembicara.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No</div>}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-800">{pembicara.name}</td>
                  <td className="p-4 text-gray-600">{pembicara.role}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link to="/dashboard/pembicara/edit" state={{ pembicara: pembicara }} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition flex items-center">Edit</Link>
                      <button onClick={() => handleDelete(pembicara.id, pembicara.name)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- LIST FOTO (GRID) --- */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-red-900 mb-4">Pembicara</h2>
        <p className="text-gray-600 mb-6">Kelola pembicara event kamu</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pembicaraList.map((pembicara) => (
            <div key={pembicara.id} className="border border-pink-200 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-100 mb-4">
                {pembicara.image ? <img src={pembicara.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Img</div>}
              </div>
              <h3 className="font-bold text-lg text-gray-800">{pembicara.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{pembicara.role}</p>
              <button onClick={() => handleDelete(pembicara.id, pembicara.name)} className="text-red-500 font-semibold hover:text-red-700 transition">Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}