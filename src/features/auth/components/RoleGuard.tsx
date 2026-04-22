import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import type { UserRole } from "@/features/auth/types/auth.types";
import { ROUTES } from "@/router/routes";

interface RoleGuardProps {
    allowedRoles: UserRole[];
}

/**
 * Redirects authenticated users who lack the required role to /not-found.
 */
export function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const user = useAppSelector((s) => s.auth.user);

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={ROUTES.NOT_FOUND} replace />;
    }

    return <Outlet />;
}
