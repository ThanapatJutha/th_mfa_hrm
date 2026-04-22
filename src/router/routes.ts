/**
 * Route path constants.
 * Use these instead of raw strings throughout the app.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SHOWCASE: "/showcase",

  // Showcase sub-pages
  SHOWCASE_BUTTON: "/showcase/button",
  SHOWCASE_INPUT: "/showcase/input",
  SHOWCASE_TEXTAREA: "/showcase/textarea",
  SHOWCASE_CHECKBOX: "/showcase/checkbox",
  SHOWCASE_ALERT: "/showcase/alert",
  SHOWCASE_AVATAR: "/showcase/avatar",
  SHOWCASE_EMPTY: "/showcase/empty",
  SHOWCASE_TABLE: "/showcase/table",
  SHOWCASE_DROPDOWN: "/showcase/dropdown",
  SHOWCASE_ICON: "/showcase/icon",
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
