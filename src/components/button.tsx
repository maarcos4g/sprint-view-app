import { ComponentProps } from "react";
import { clsx } from 'clsx'

interface ButtonProps extends ComponentProps<"button"> {
  variant: "default" | "outline"
}

export function Button({ children, variant, ...props }: ButtonProps) {
  return (
    <button
      className={clsx("w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-3", {
        'bg-green-800 text-zinc-100 hover:bg-green-900': variant === 'default',
        'border border-green-800 bg-transparent text-green-800': variant === 'outline',
      })}
      {...props}
    >
      {children}
    </button>
  )
}