import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: string | number;
  name: string;
  email: string;
  foto?: string;
}

export default function UserIndex() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      if (Array.isArray(data)) {
        setUserList(data);
      }
    } catch (error) {
      console.error("Error fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string | number, name: string) => {
    if (confirm(`Yakin ingin menghapus user "${name}"?`)) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error("Gagal menghapus user:", error);
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-2xl font-bold text-red-900">User</h1>
        <p className="text-gray-600">Kelola data user</p>

        <Link
          to="/dashboard/user/create"
          className="mt-4 bg-red-900 hover:bg-red-800 text-white px-5 py-2 rounded-lg"
        >
          + Tambah User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="p-4">Foto</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400">
                  Sedang memuat data...
                </td>
              </tr>
            ) : userList.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400">
                  Belum ada data user.
                </td>
              </tr>
            ) : (
              userList.map((user) => (
                <tr key={user.id} className="border-b hover:bg-red-50">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {user.foto ? (
                        <img src={user.foto} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to="/dashboard/user/edit"
                        state={{ user }}
                        className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
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