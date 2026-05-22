import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import { Button } from "../../../components/Button";


const schema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
});

type FormData = {
  name: string;
};

export default function CategoryCreate() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // (sesuai backend)
      const response = await fetch("https://syifa-backend.vercel.app/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name, 
        }),
      });

    
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server tidak merespons dengan JSON. Pastikan backend aman.");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan kategori");
      }

      alert("Kategori Berhasil Ditambahkan");
      navigate("/dashboard/category"); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Gagal menyambung ke server backend");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">Tambah Category Baru</h1>
        <p className="text-center mb-6 text-red-800">Silakan isi form di bawah ini</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Kategori"
            Nama="name" 
            register={register}
            error={errors.name?.message}
          />
          
          <div className="flex flex-row items-center gap-6 mt-6">
            <div className="w-fit">
              <Button type="submit" label="Simpan" variant="primary" />
            </div>
            <Link to="/dashboard/category" className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition shadow-md font-bold">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}