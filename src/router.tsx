import { createBrowserRouter } from "react-router-dom"

import { AuthLayout } from "./pages/layouts/auth"
import { AppLayout } from "./pages/layouts/app"

import { SignIn } from "./pages/auth/sign-in"
import { Unauthorized } from "./pages/auth/unauthorized"
import { ConfirmCode } from "./pages/auth/confirm-code"
import { Home } from "./pages/app"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
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