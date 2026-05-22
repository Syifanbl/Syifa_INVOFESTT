import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Interface disesuaikan dengan skema model Event di Prisma backend kamu
interface EventData {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;
}

export default function EventIndex() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil semua data event dari backend
  const fetchEvents = async () => {
    try {
      // PERBAIKAN URL: Menembak ke /events (pakai s, sesuai router backend)
      const response = await fetch("http://localhost:3000/events");
      if (!response.ok) {
        throw new Error("Gagal mengambil data event dari server");
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fungsi untuk menghapus event
  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Yakin ingin menghapus event "${name}"?`)) {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus event di server");
        }

        alert("Event berhasil dihapus");
        fetchEvents(); // Reload data setelah berhasil dihapus
      } catch (error: any) {
        console.error(error);
        alert(error.message || "Gagal menghapus event");
      }
    }
  };

  // Fungsi pembantu untuk merapikan tampilan format tanggal HTML
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-6 w-full flex-1"> 
      <div className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-2xl font-bold text-red-900">Event</h1>
        <p className="text-gray-600">Daftar event Invofest yang tersedia</p>

        <Link
          to="/dashboard/event/create"
          className="mt-4 bg-red-900 hover:bg-red-800 text-white px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm font-bold"
        >
          <span className="text-lg font-bold">+</span> Tambah Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full min-w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="p-4">Nama Event</th>
              <th className="p-4">Lokasi</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 italic">
                  Sedang mengambil data event dari database...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 italic">
                  Belum ada data event.
                </td>
              </tr>
            ) : (
              events.map((ev) => (
                <tr key={ev.id} className="border-b hover:bg-red-50 transition">
                  <td className="p-4 text-gray-800 font-medium">{ev.name}</td>
                  <td className="p-4 text-gray-600">{ev.location}</td>
                  <td className="p-4 text-gray-600">{formatDate(ev.dateEvent)}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">{ev.description}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to="/dashboard/event/edit"
                        state={{ event: ev }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
                      >
                        Edit
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(ev.id, ev.name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
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