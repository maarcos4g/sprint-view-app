import { createBrowserRouter } from "react-router-dom"

import { AuthLayout } from "./pages/layouts/auth"

import { SignIn } from "./pages/auth/sign-in"
import { Unauthorized } from "./pages/auth/unauthorized"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />
      },
    ]
  }
])