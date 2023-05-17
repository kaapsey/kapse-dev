import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ roles }) => {
  
    const user = { role: '' };

    return (
        <>
            { roles.contains(user.role) ? <Outlet /> : <Navigate to="/unauthorized" /> }
        </>
    )
}

export default ProtectedRoutes