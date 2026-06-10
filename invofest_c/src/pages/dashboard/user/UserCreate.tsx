import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          foto,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan user");
      }

      alert("User berhasil ditambahkan");
      navigate("/dashboard/user");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Tambah User Baru
        </h1>

        <p className="text-center mb-6 text-red-800">
          Silahkan isi data user di bawah ini
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">
              Nama User
            </label>
            <input
              type="text"
              placeholder="Nama User"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email User"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password User"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold">
              URL Foto User
            </label>
            <input
              type="text"
              placeholder="https://contoh.com/foto.jpg"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>

          <div className="flex flex-row items-center gap-6 mt-8">
            <button
              type="submit"
              className="bg-red-900 text-white py-2 px-6 rounded hover:bg-red-800 transition shadow-md whitespace-nowrap font-bold"
            >
              Simpan
            </button>

            <Link
              to="/dashboard/user"
              className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition shadow-md whitespace-nowrap font-bold"
            >
              Batal
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}