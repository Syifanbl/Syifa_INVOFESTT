import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UserType {
  id: string | number;
  name: string;
  email: string;
  foto?: string;
}

export default function UserEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState<string | number>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const stateData = location.state as { user: UserType } | null;

    if (stateData && stateData.user) {
      setUserId(stateData.user.id);
      setName(stateData.user.name);
      setEmail(stateData.user.email);
      setFoto(stateData.user.foto || "");
    } else {
      navigate("/dashboard/user");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          foto,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal update user");
      }

      alert("User berhasil diupdate");
      navigate("/dashboard/user");
    } catch (error) {
      console.error(error);
      alert("Gagal update user");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Edit User
        </h1>

        <p className="text-center mb-6 text-red-800">
          Silahkan ubah data user di bawah ini
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">Nama User</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">URL Foto User</label>
            <input
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              placeholder="https://contoh.com/foto.jpg"
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>

          {foto && (
            <div className="mt-3">
              <img
                src={foto}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}

          <div className="flex flex-row items-center gap-6 mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-red-900 text-white py-2 px-6 rounded hover:bg-red-800 transition shadow-md whitespace-nowrap font-bold disabled:opacity-50"
            >
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/user")}
              className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition shadow-md whitespace-nowrap font-bold"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}