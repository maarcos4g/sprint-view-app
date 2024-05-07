import { ComponentProps } from "react"

interface InputProps extends ComponentProps<"input"> { }

export function Input({ ...props }: InputProps) {
  return (
    <input 
    className="w-full h-10 bg-transparent border border-zinc-300 px-4 py-2 rounded-lg text-zinc-800 font-medium"
    {...props}
    />
  )
} 