import { ComponentProps } from "react"
import { useLocation, Link } from "react-router-dom"

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      className="flex items-center gap-1.5 text-base font-bold text-zinc-800 transition-colors px-3 py-1.5 rounded-lg data-[current=true]:bg-green-500 data-[current=true]:text-zinc-600"
      data-current={pathname === props.to}
      {...props}
    >
      {props.children}
    </Link>
  )
}