"use client"

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps {
    variant: ButtonVariant;
    text: string;
    size: ButtonSize;
    onClick: () => void;
    loading?: boolean;
}

export const Button = ({variant, text, size, onClick, loading}: ButtonProps) => {
    const baseStyles = "rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
        tertiary: "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:cursor-pointer focus:ring-blue-500 transition duration-300",
    };
    const sizeStyles = {
        small: "px-4 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? 'Loading...' : text}
        </button>
    );
}