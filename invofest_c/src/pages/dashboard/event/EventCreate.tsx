import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"; 

type EventFormData = {
  name: string;
  dateEvent: string;
  location: string;
  description: string;
  categoryId: string;  
  pembicaraId: string;  
};

interface Sepeaker {
  id: number;
  name: string;
}

export default function EventCreate() {
  const navigate = useNavigate();
  // 3. State untuk menyimpan data dropdown
  const [categories, setCategories] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<Sepeaker[]>([]);

  // 4. Fetch data saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCat, resSpk] = await Promise.all([
          fetch("https://syifa-backend.vercel.app/categories"),
          fetch("https://syifa-backend.vercel.app/pembicara")
        ]);
        const catData = await resCat.json();
        const spkData = await resSpk.json();
        
        
        setCategories(catData.data || catData);
        setSpeakers(spkData.data || spkData);
        console.log("Data Pembicara dari API:", spkData); 
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>();
  console.log(errors);

  const onSubmit = async (data: EventFormData) => {
    try {
      const formattedData = {
        name: data.name,
        location: data.location,
        dateEvent: new Date(data.dateEvent).toISOString(),
        description: data.description,
        categoryId: parseInt(data.categoryId), 
        pembicaraId: parseInt(data.pembicaraId) 
      };

      const response = await fetch("https://syifa-backend.vercel.app/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Gagal menyimpan data");

      alert("Event Berhasil Ditambahkan");
      navigate("/dashboard/event"); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-160 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">Tambah Event Baru</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Input Nama, Lokasi, Tanggal, Deskripsi tetap sama */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Nama Event</label>
            <input type="text" {...register("name", { required: true })} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          {/* 5. Dropdown Kategori */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Kategori</label>
            <select {...register("categoryId", { required: true })} className="w-full px-3 py-2 border rounded-lg bg-white">
              <option value="">-- Pilih Kategori --</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* 6. Dropdown Pembicara */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Pembicara</label>
            <select {...register("pembicaraId", { required: true })} className="w-full px-3 py-2 border rounded-lg bg-white">
              <option value="">-- Pilih Pembicara --</option>
              {speakers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          {/* Input Lokasi, Tanggal, Deskripsi */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Lokasi</label>
            <input type="text" {...register("location", { required: true })} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Tanggal</label>
            <input type="date" {...register("dateEvent", { required: true })} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Deskripsi</label>
            <textarea {...register("description", { required: true })} rows={3} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="flex flex-row items-center gap-6 mt-6">
            <button type="submit" className="bg-red-900 text-white py-2 px-6 rounded font-bold">Simpan</button>
            <button type="button" onClick={() => navigate("/dashboard/event")} className="bg-gray-500 text-white py-2 px-6 rounded font-bold">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}