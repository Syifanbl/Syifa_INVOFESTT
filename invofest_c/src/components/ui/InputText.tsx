interface InputTextProps{
    label:string;
    Nama:string;
    error?:string;
    register:any;
}

export const InputText: React.FC<InputTextProps> =({
    label,
    Nama,
    error,
    register,
    
}) => {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={label}>{label}</label>
            <input type="text" {...register(Nama)} placeholder={label} className="border p-2" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};
