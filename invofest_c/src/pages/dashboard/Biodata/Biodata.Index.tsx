import { useState } from "react";

interface BiodataType {
  nama: string;
  nim: string;
  prodi: string;
  universitas: string;
  email: string;
  github?: string;
}

export default function BiodataIndex() {
  const [biodata] = useState<BiodataType>({
    nama: "Syifa Nabila",
    nim: "24090083",
    prodi: "Sarjana Terapan Teknik Informatika",
    universitas: "Universitas Harkat Negeri",
    email: "syifanabila183@gmail.com",
    github: "github.com/syifanbl",
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 w-full flex justify-center items-center min-h-[80vh] bg-pink-50">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(244,114,182,0.15)] overflow-hidden border border-pink-100 flex flex-col md:flex-row transition-all duration-500">
        
        {/* Sisi Kiri: Profil */}
        <div className="md:w-1/3 bg-pink-700 p-10 flex flex-col items-center text-white text-center">
          <div className="relative mb-6 group">
            <div className="w-36 h-36 bg-pink-800 rounded-full border-4 border-pink-500 shadow-xl flex items-center justify-center text-white text-5xl font-black overflow-hidden relative transition-transform group-hover:scale-105">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                biodata.nama.split(" ").map(n => n[0]).join("")
              )}
              
              <label htmlFor="photoUpload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-[10px] font-black tracking-widest uppercase">
                GANTI FOTO
              </label>
            </div>
            <input type="file" id="photoUpload" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>

          {/* Nama tidak bold */}
          <h2 className="text-2xl font-normal tracking-tight text-white">{biodata.nama}</h2>
          <p className="text-pink-100 text-sm mt-1 uppercase tracking-[0.2em] font-medium opacity-80">Mahasiswa</p>
          
          <div className="mt-8 w-full border-t border-pink-500 pt-6 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-pink-200 font-bold">NIM</span>
              <span className="font-black text-white">{biodata.nim}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-pink-200 font-bold">STATUS</span>
              <span className="text-white flex items-center gap-2 font-black">
                AKTIF 
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Informasi Detail */}
        <div className="md:w-2/3 p-10 bg-white">
          <div className="border-b border-pink-100 pb-6 mb-8">
            <h1 className="text-3xl font-black text-pink-950 tracking-tight">Informasi Biodata</h1>
            <p className="text-pink-800 mt-1 font-bold">Detail profil akademik mahasiswa</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Prodi, Kampus, Email, GitHub menggunakan isLight (tidak bold) */}
            <InfoItem label="Program Studi" value={biodata.prodi} isLight />
            <InfoItem label="Kampus" value={biodata.universitas} isLight />
            <InfoItem label="Kontak Email" value={biodata.email} isLight />
            <InfoItem label="GitHub Profil" value={biodata.github || "-"} isLink isLight />
          </div>

          <div className="mt-12 pt-6 border-t border-pink-100 text-pink-500 text-xs flex justify-between items-center font-bold">
            <p>© 2026 Invofest System</p>
            <div className="px-4 py-1.5 bg-pink-100 rounded-full text-pink-700">TERVERIFIKASI</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen InfoItem
function InfoItem({ label, value, isLink, isLight }: { label: string, value: string, isLink?: boolean, isLight?: boolean }) {
  return (
    <div className="space-y-1">
      {/* Label tetap tegas (font-black) */}
      <label className="text-[10px] font-black text-pink-800 uppercase tracking-[0.2em]">{label}</label>
      
      
      <p className={`text-sm ${isLight ? "font-medium" : "font-black"} ${isLink ? "text-pink-700 hover:text-pink-950 hover:underline cursor-pointer transition-colors" : "text-pink-950"}`}>
        {value}
      </p>
    </div>
  );
}