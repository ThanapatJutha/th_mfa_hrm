export type UserRole = "admin" | "employee";

export interface AuthUser {
    id: string;
    name: string;
    role: UserRole;
    employeeId?: string; // linked employee record (for role=employee)
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}
