import React from "react";

interface TextareaProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  placeholder?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className="border rounded px-3 py-2 min-h-"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};