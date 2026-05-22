import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Tipe data disesuaikan dengan key dari backend kamu
type EventFormData = {
  name: string;
  dateEvent: string;
  location: string;
  description: string;
};

export default function EventCreate() {
  const navigate = useNavigate();

  // Inisialisasi react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    try {
      // Menyiapkan data agar strukturnya tepat sesuai req.body backend
      const formattedData = {
        name: data.name,
        location: data.location,
        dateEvent: data.dateEvent, // Mengirim string tanggal langsung karena backend punya fungsi parseDate()
        description: data.description
      };

      const response = await fetch("https://syifa-backend.vercel.app/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan data event ke server");
      }

      alert("Event Berhasil Ditambahkan");
      navigate("/dashboard/event"); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-160 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">Tambah Event Baru</h1>
        <p className="text-center mb-6 text-red-800">Silakan isi seluruh field di bawah ini</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* 1. NAMA EVENT (name) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Nama Event</label>
            <input
              type="text"
              {...register("name", { required: "Nama event wajib diisi" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
              placeholder="Contoh: Seminar Digital Empowerment"
            />
            {errors.name && <span className="text-red-600 text-xs mt-1 block">{errors.name.message}</span>}
          </div>

          {/* 2. LOKASI (location) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Lokasi (Location)</label>
            <input
              type="text"
              {...register("location", { required: "Lokasi wajib diisi" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
              placeholder="Contoh: Aula Gedung C / Zoom Meeting"
            />
            {errors.location && <span className="text-red-600 text-xs mt-1 block">{errors.location.message}</span>}
          </div>

          {/* 3. TANGGAL EVENT (dateEvent) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Tanggal (Date)</label>
            <input
              type="date"
              {...register("dateEvent", { required: "Tanggal wajib diisi" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
            {errors.dateEvent && <span className="text-red-600 text-xs mt-1 block">{errors.dateEvent.message}</span>}
          </div>

          {/* 4. DESKRIPSI (description) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Deskripsi (Description)</label>
            <textarea
              {...register("description", { required: "Deskripsi wajib diisi" })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
              placeholder="Jelaskan detail mengenai event ini..."
            />
            {errors.description && <span className="text-red-600 text-xs mt-1 block">{errors.description.message}</span>}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-row items-center gap-6 mt-6">
            <button type="submit" className="bg-red-900 hover:bg-red-800 text-white py-2 px-6 rounded font-bold shadow-md transition">
              Simpan Event
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/event")}
              className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition shadow-md font-bold"
            >
              Batal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}