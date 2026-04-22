import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/router/routes";

/**
 * Redirects unauthenticated users to /login.
 */
export function ProtectedRoute() {
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
}
