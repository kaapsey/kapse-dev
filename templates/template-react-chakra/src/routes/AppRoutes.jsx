import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./helpers/ProtectedRoutes"

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<>Landing</>} />

        {/* Authentication Routes */}
        <Route path="/auth/*">
            <Route path="login" element={<>Login</>} />
            <Route path="register" element={<>Register</>} />
            <Route path="forgot-password" element={<>Forgot-password</>} />
            <Route path="reset-password" element={<>Reset-password</>} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes roles={['admin']} />}>
        </Route>

        {/* Unauthorized and not found routes */}
        <Route path="/unauthorized" element={<>Unauthorized</>} />
        <Route path="*" element={<>404</>} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute