/**
 * Route path constants.
 * Use these instead of raw strings throughout the app.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SHOWCASE: "/showcase",
  NOT_FOUND: "*",

  // Employee module (admin)
  EMPLOYEES: "/employees",
  EMPLOYEES_NEW: "/employees/new",
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,
  EMPLOYEE_EDIT: (id: string) => `/employees/${id}/edit`,

  // Performance module (admin)
  PERFORMANCE: "/performance",
  PERFORMANCE_NEW: "/performance/new",
  PERFORMANCE_DETAIL: (id: string) => `/performance/${id}`,
  PERFORMANCE_EDIT: (id: string) => `/performance/${id}/edit`,

  // Self-service (employee role)
  MY_PROFILE: "/my-profile",
  MY_PERFORMANCE: "/my-performance",
} as const;
