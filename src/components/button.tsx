import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button 
    className="bg-green-800 w-full py-2 rounded-lg text-zinc-100 font-bold text-sm hover:bg-green-900"
    >
      {children}
    </button>
  )
}