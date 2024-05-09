import { createBrowserRouter } from "react-router-dom"

import { AuthLayout } from "./pages/layouts/auth"

import { SignIn } from "./pages/auth/sign-in"
import { Unauthorized } from "./pages/auth/unauthorized"
import { ConfirmCode } from "./pages/auth/confirm-code"
import { AppLayout } from "./pages/layouts/app"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: []
  },
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
      {
        path: '/confirm-code',
        element: <ConfirmCode />
      },
    ]
  }
])