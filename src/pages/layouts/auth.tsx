import { Outlet } from "react-router-dom";

import logo from '../../assets/logo2.svg'

export function AuthLayout() {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col border-r border-neutral-300 bg-neutral-100 p-10 dark:border-r lg:flex">
        <img src={logo} alt="Logo do Sprint view" className="w-36" />
        <div className="mt-auto">
          <footer className="text-sm text-zinc-500">
            Dashboard Scrum &copy; <strong>sprint view</strong> - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative bg-white flex min-h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}