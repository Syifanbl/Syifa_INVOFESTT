import { useEffect, useState } from "react";

export default function DashboardIndex() {
  const [totalEvent, setTotalEvent] = useState<number>(0);
  const [totalCategory, setTotalCategory] = useState<number>(0);
  const [totalPembicara, setTotalPembicara] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fungsi helper untuk mengambil array dari respons API apa pun
  const getCount = (data: any): number => {
    if (Array.isArray(data)) return data.length;
    if (data && typeof data === 'object') {
      // Mencari properti pertama yang berisi array
      const foundArray = Object.values(data).find(val => Array.isArray(val));
      return foundArray ? (foundArray as any[]).length : 0;
    }
    return 0;
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Ambil Event
      const resEvent = await fetch("https://syifa-backend.vercel.app/events");
      if (resEvent.ok) {
        const data = await resEvent.json();
        setTotalEvent(getCount(data));
      }

      // 2. Ambil Category
      const resCategory = await fetch("https://syifa-backend.vercel.app/categories");
      if (resCategory.ok) {
        const data = await resCategory.json();
        setTotalCategory(getCount(data));
      }

      // 3. Ambil Pembicara
      const resPembicara = await fetch("https://syifa-backend.vercel.app/pembicara");
      if (resPembicara.ok) {
        const data = await resPembicara.json();
        console.log("Struktur data pembicara:", data); // Cek di console F12
        setTotalPembicara(getCount(data));
      }
    } catch (error) {
      console.error("Gagal sinkronisasi data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold text-red-950 mb-1 tracking-tight">Dashboard</h1>
      <p className="text-gray-500 mb-8 text-sm">Selamat datang di dashboard digital empowerment Invofest</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: TOTAL EVENT */}
        <div className="bg-[#FFF0F5] p-8 rounded-2xl border border-pink-200 shadow-sm hover:shadow-md transition-all duration-300 min-h-40 flex flex-col justify-center">
          <p className="text-base font-semibold text-pink-700 tracking-wide mb-1">Total Event</p>
          <h2 className="text-5xl font-extrabold text-red-950">{loading ? "..." : totalEvent}</h2>
        </div>

        {/* CARD 2: CATEGORY */}
        <div className="bg-[#FFF0F5] p-8 rounded-2xl border border-pink-200 shadow-sm hover:shadow-md transition-all duration-300 min-h-40 flex flex-col justify-center">
          <p className="text-base font-semibold text-pink-700 tracking-wide mb-1">Category</p>
          <h2 className="text-5xl font-extrabold text-red-950">{loading ? "..." : totalCategory}</h2>
        </div>

        {/* CARD 3: PEMBICARA */}
        <div className="bg-[#FFF0F5] p-8 rounded-2xl border border-pink-200 shadow-sm hover:shadow-md transition-all duration-300 min-h-40 flex flex-col justify-center">
          <p className="text-base font-semibold text-pink-700 tracking-wide mb-1">Pembicara</p>
          <h2 className="text-5xl font-extrabold text-red-950">{loading ? "..." : totalPembicara}</h2>
        </div>
      </div>
    </div>
  );
}