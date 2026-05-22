import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EventEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [locationName, setLocationName] = useState(""); 
  const [waktu, setWaktu] = useState("");
  const [description, setDescription] = useState(""); 

  useEffect(() => {
    
    const stateData = location.state as any;

    if (stateData && stateData.event) {
      const e = stateData.event;
      setEventId(String(e.id));
      setEventName(e.name || "");
      setLocationName(e.location || "");
      setWaktu(e.dateEvent || ""); // Pastikan key sesuai dengan database
      setDescription(e.description || "");
    } else {
      navigate("/dashboard/event");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !eventId) return;

    try {
      const response = await fetch(`https://syifa-backend.vercel.app/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          location: locationName,
          dateEvent: waktu,
          description: description,
        }),
      });

      if (!response.ok) throw new Error("Gagal mengupdate event");

      alert("Data event berhasil diperbarui!");
      navigate("/dashboard/event");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Terjadi kesalahan saat menyimpan perubahan.");
    }
  };

  return (
    <div className="p-6 w-full max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-900">Edit Event</h1>
        <p className="text-gray-600 text-sm">Ubah detail informasi event pilihan Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nama Event</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Lokasi</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Waktu Pelaksanaan</label>
          <input
            type="datetime-local" 
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-900 outline-none text-sm"
            rows={3}
            required
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/event")}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-red-900 hover:bg-red-800 text-white rounded-lg font-bold"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}