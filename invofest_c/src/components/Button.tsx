interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  variant?: "primary" | "outline";
  isLoading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "primary",
  isLoading = false,
  className = "",
}) => {
  const base = "px-4 py-2 rounded font-medium transition-all";

  const styles = {
    primary: "bg-red-900 text-white hover:bg-red-800 disabled:bg-red-300",
    outline: "border border-red-900 text-red-900 hover:bg-red-50 disabled:border-red-300"
  };

  return (
    <button
      type={type}
      disabled={isLoading} 
      className={`${base} ${styles[variant]} ${className}`}
     
    >
      
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;