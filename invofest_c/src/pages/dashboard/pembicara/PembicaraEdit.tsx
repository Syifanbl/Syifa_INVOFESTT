import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface PembicaraType {
  id: string | number;
  name: string;
  role: string;
  image?: string;
}

export default function PembicaraEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pembicaraId, setPembicaraId] = useState<string | number>("");
  const [pembicaraName, setPembicaraName] = useState("");
  const [pembicaraRole, setPembicaraRole] = useState("");
  const [pembicaraImage, setPembicaraImage] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Tambahan: State Preview
  const [isSaving, setIsSaving] = useState(false); // Tambahan: State Loading

  useEffect(() => {
    const stateData = location.state as { pembicara: PembicaraType } | null;

    if (stateData && stateData.pembicara) {
      setPembicaraId(stateData.pembicara.id);
      setPembicaraName(stateData.pembicara.name);
      setPembicaraRole(stateData.pembicara.role);
      setPembicaraImage(stateData.pembicara.image || "");
    } else {
      navigate("/dashboard/pembicara");
    }
  }, [location, navigate]);

  // Tambahan: Effect untuk generate preview URL
  useEffect(() => {
    if (fileInput) {
      const url = URL.createObjectURL(fileInput);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fileInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pembicaraName.trim() || !pembicaraRole.trim() || !pembicaraId) return;

    setIsSaving(true); // Mulai loading
    try {
      const response = await fetch(`https://syifa-backend.vercel.app/pembicara/${pembicaraId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pembicaraName,
          role: pembicaraRole,
          image: fileInput ? fileInput.name : pembicaraImage,
        }),
      });

      if (!response.ok) throw new Error("Gagal memperbarui data");

      alert("Data pembicara berhasil diperbarui!");
      navigate("/dashboard/pembicara");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false); // Selesai loading
    }
  };

  return (
    <div className="p-6 w-full max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-900">Edit Pembicara</h1>
        <p className="text-gray-600 text-sm">Ubah informasi data pembicara</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-5">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nama Pembicara</label>
          <input
            type="text"
            value={pembicaraName}
            onChange={(e) => setPembicaraName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Role / Jabatan</label>
          <input
            type="text"
            value={pembicaraRole}
            onChange={(e) => setPembicaraRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto Pembicara <span className="text-xs font-normal text-gray-400">(Opsional)</span>
          </label>
          <input
            type="file"
            onChange={(e) => setFileInput(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-900 hover:file:bg-red-100"
          />
          {/* Preview Foto */}
          {(previewUrl || (pembicaraImage && !fileInput)) && (
            <div className="mt-3">
              <img 
                src={previewUrl || pembicaraImage} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/pembicara")}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-red-900 hover:bg-red-800 text-white rounded-lg font-bold shadow-sm transition disabled:opacity-50"
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}