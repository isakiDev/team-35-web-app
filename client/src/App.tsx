import { useEffect } from "react"

import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"

import { useAuth } from "./hooks/useAuth"
import Spinner from "./components/Spinner"

function App() {
  const { user, status, isAuthenticated, onValidateToken } = useAuth()

  const authContext = {
    user,
    status,
    isAuthenticated
  }

  useEffect(() => {
    onValidateToken()
      .then()
  }, [])

  if (status === 'PENDING') {
    return <Spinner />
  }

  return <RouterProvider router={router} context={{ auth: authContext }} />
}

export default App