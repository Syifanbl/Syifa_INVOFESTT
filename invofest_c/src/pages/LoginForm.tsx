import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
  Email: string;
  Password: string;
};

const schema = z.object({
  Email: z.string().min(1, "Email harus diisi"),
  Password: z.string().min(8, "password minimal 8 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

 
  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (data.Email == "24090083" && data.Password == "24090083") {
      alert("Login Berhasil");

      login(data.Email)

      //Redirect ke halaman dashboard
      navigate("/dashboard")
    } else {
      alert("Email atau password anda salah!");
    }
    };


 return (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-900">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputText
          label="Email"
          Nama="Email"
          register={register}
          error={errors.Email?.message}
        />

        <InputPassword
          label="Password"
          Nama="Password"
          register={register}
          error={errors.Password?.message}
        />

        <Button
          type="submit"
          label="Login"
          variant="primary"
          
        />

        <div className="text-center">
          Belum punya akun? <Link to="/register">Daftar Disini</Link>
        </div>
      </form>
    </div>
  </div>
);
}
