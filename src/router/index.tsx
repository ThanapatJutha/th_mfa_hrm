import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { ShowcasePage } from "@/pages/ShowcasePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { EmployeeListPage } from "@/features/employees/pages/EmployeeListPage";
import { EmployeeDetailPage } from "@/features/employees/pages/EmployeeDetailPage";
import { EmployeeFormPage } from "@/features/employees/pages/EmployeeFormPage";
import { PerformanceListPage } from "@/features/performance/pages/PerformanceListPage";
import { EvaluationDetailPage } from "@/features/performance/pages/EvaluationDetailPage";
import { EvaluationFormPage } from "@/features/performance/pages/EvaluationFormPage";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
    // Public
    {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.LOGIN} replace />,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },

    // Authenticated routes
    {
        element: <ProtectedRoute />,
        children: [
            // Shared layout
            {
                element: <AppLayout />,
                children: [
                    // Showcase (design system reference)
                    {
                        path: ROUTES.SHOWCASE,
                        element: <ShowcasePage />,
                    },

                    // Admin-only: employees
                    {
                        element: <RoleGuard allowedRoles={["admin"]} />,
                        children: [
                            { path: ROUTES.EMPLOYEES, element: <EmployeeListPage /> },
                            { path: ROUTES.EMPLOYEES_NEW, element: <EmployeeFormPage /> },
                            { path: "/employees/:id", element: <EmployeeDetailPage /> },
                            { path: "/employees/:id/edit", element: <EmployeeFormPage /> },
                        ],
                    },

                    // Admin-only: performance
                    {
                        element: <RoleGuard allowedRoles={["admin"]} />,
                        children: [
                            { path: ROUTES.PERFORMANCE, element: <PerformanceListPage /> },
                            { path: ROUTES.PERFORMANCE_NEW, element: <EvaluationFormPage /> },
                            { path: "/performance/:id", element: <EvaluationDetailPage /> },
                            { path: "/performance/:id/edit", element: <EvaluationFormPage /> },
                        ],
                    },

                    // Employee self-service
                    {
                        element: <RoleGuard allowedRoles={["employee"]} />,
                        children: [
                            { path: ROUTES.MY_PROFILE, element: <EmployeeDetailPage selfView /> },
                            { path: ROUTES.MY_PERFORMANCE, element: <PerformanceListPage selfView /> },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
    },
]);
