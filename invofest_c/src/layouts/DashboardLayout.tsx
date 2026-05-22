import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"; 
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout(){
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();

    // fungsi logout
    const handleLogout = () => {
        logout();
        // Redirect ke halaman login
        navigate("/login");
    }

    return (
        <div className="flex w-full min-h-screen bg-gray-50">

            {/* kiri */}
            <div className="bg-pink-200 w-64 flex flex-col justify-between p-4 shrink-0">
                {/* atas */}
                <div>
                    <h1 className="text-2xl font-bold text-center text-red-900">Invofest</h1>
                </div>

                {/* tengah */}
                <div className="flex-1 mt-10">
                    <ul className="flex flex-col gap-6 w-full"> 
                        {[
                            { name: "Dashboard", path: "/dashboard" },
                            { name: "Category", path: "/dashboard/category" },
                            { name: "Pembicara", path: "/dashboard/pembicara" },
                            { name: "Event", path: "/dashboard/event" },
                            { name: "Biodata", path: "/dashboard/biodata" }, // <-- Menu Biodata baru ditambahkan di sini
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`block px-5 py-3 rounded-xl font-bold transition-all duration-200 
                                    ${location.pathname === item.path 
                                        ? "bg-red-900 text-white shadow-md" 
                                        : "text-red-900 hover:bg-red-300/50"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* bawah */}
                <div>
                    <button 
                        type="button"
                        onClick={handleLogout}
                        className="w-full p-4 bg-red-700 text-white rounded cursor-pointer hover:bg-red-950 font-bold transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* kanan */}
            <div className="flex-1 w-full p-6 overflow-x-auto">
                <Outlet/>
            </div>
        </div>
    )
}