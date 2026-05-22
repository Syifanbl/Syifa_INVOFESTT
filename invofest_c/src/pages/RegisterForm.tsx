import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom"

type FormData = {
    Nama: string;
    Email: string;
    Password: string;
    Password_confirm: string;
    bio: string;
    event: string;
};

const schema = z.object({
    Nama: z.string().min(1, "Nama harus diisi"),
    Email: z.string().min(8, "Email harus diisi"),
    Password: z.string().min(8, "password minimal 8 karakter"),
    Password_confirm: z.string().min(8, "password minimal 8 karakter"),
    bio: z.string().min(1, "Bio wajib diisi"),
    event: z.string().min(1, "Event wajib dipilih"),
});

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        console.log(data);
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="w-150 bg-[#FCE7F3] shadow-lg rounded-2xl p-10">
            <h1  className="text-2xl font-bold mb-6 text-center text-red-900">Form Registrasi</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <InputText
                    label="Nama"
                    Nama="Nama"
                    register={register}
                    error={errors.Nama?.message}
                />

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
                
        

                <InputPassword
                    label="Konfirmasi Password"
                    Nama="Password_confirm"
                    register={register}
                    error={errors.Password_confirm?.message}
                />

                <Textarea
                    label="Bio"
                    name="bio"
                    register={register}
                    error={errors.bio?.message}
                />

                <Select
                    label="Event"
                    name="event"
                    register={register}
                    options={[
                        { label: "Invofest", value: "invofest" },
                        { label: "Workshop AI", value: "ai" }
                    ]}
                    error={errors.event?.message}
                />
         
                <Button type="submit" label="Daftar" variant="primary" isLoading={loading} />

                <div>
                    
                    <div>
                        Belum punya akun? <Link to="/login">Login Disini</Link>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}