import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ShowcaseLayout } from "@/pages/showcase/ShowcaseLayout";
import { ButtonShowcase } from "@/pages/showcase/ButtonShowcase";
import { InputShowcase } from "@/pages/showcase/InputShowcase";
import { TextareaShowcase } from "@/pages/showcase/TextareaShowcase";
import { CheckboxShowcase } from "@/pages/showcase/CheckboxShowcase";
import { AlertShowcase } from "@/pages/showcase/AlertShowcase";
import { AvatarShowcase } from "@/pages/showcase/AvatarShowcase";
import { EmptyShowcase } from "@/pages/showcase/EmptyShowcase";
import { TableShowcase } from "@/pages/showcase/TableShowcase";
import { DropdownShowcase } from "@/pages/showcase/DropdownShowcase";
import { IconShowcase } from "@/pages/showcase/IconShowcase";
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
                    // Showcase — redirect /showcase → /showcase/button
                    {
                        path: ROUTES.SHOWCASE,
                        element: <Navigate to={ROUTES.SHOWCASE_BUTTON} replace />,
                    },
                    // Showcase sub-pages
                    {
                        element: <ShowcaseLayout />,
                        children: [
                            { path: ROUTES.SHOWCASE_BUTTON, element: <ButtonShowcase /> },
                            { path: ROUTES.SHOWCASE_INPUT, element: <InputShowcase /> },
                            { path: ROUTES.SHOWCASE_TEXTAREA, element: <TextareaShowcase /> },
                            { path: ROUTES.SHOWCASE_CHECKBOX, element: <CheckboxShowcase /> },
                            { path: ROUTES.SHOWCASE_ALERT, element: <AlertShowcase /> },
                            { path: ROUTES.SHOWCASE_AVATAR, element: <AvatarShowcase /> },
                            { path: ROUTES.SHOWCASE_EMPTY, element: <EmptyShowcase /> },
                            { path: ROUTES.SHOWCASE_TABLE, element: <TableShowcase /> },
                            { path: ROUTES.SHOWCASE_DROPDOWN, element: <DropdownShowcase /> },
                            { path: ROUTES.SHOWCASE_ICON, element: <IconShowcase /> },
                        ],
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
