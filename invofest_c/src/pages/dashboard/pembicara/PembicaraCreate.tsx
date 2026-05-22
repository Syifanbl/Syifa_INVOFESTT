import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import { Button } from "../../../components/Button";

// 1. Ubah skema agar image menjadi string
const schema = z.object({
  name: z.string().min(1, "Nama pembicara harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
  image: z.string().url("Masukkan URL gambar yang valid").optional().or(z.literal("")),
});

type FormData = {
  name: string;
  role: string;
  image?: string;
};

export default function PembicaraCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/pembicara", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 2. Kirim data image langsung sebagai string URL
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          image: data.image || "", 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menambahkan pembicara");
      }

      alert("Pembicara berhasil ditambahkan");
      navigate("/dashboard/pembicara");

    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan pembicara");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Tambah Pembicara Baru
        </h1>
        <p className="text-center mb-6 text-red-800">
          Silahkan isi data pembicara di bawah ini
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Pembicara"
            Nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Role / Jabatan"
            Nama="role"
            register={register}
            error={errors.role?.message}
          />

          {/* 3. Input URL Foto sebagai teks */}
          <div className="flex flex-col gap-1">
            <label className="text-red-900 font-semibold" htmlFor="image">
              URL Foto Pembicara
            </label>
            <input
              type="text"
              id="image"
              {...register("image")}
              placeholder="https://contoh.com/foto.jpg"
              className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center gap-6 mt-8">
            <div className="w-fit">
              <Button type="submit" label="Simpan" variant="primary" />
            </div>
            <Link
              to="/dashboard/pembicara"
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