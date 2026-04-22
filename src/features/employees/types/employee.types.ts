export type EmployeeStatus = "active" | "inactive";

export interface Employee {
    id: string;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    startDate: string; // ISO date string
    status: EmployeeStatus;
    avatarUrl?: string;
}

export interface EmployeesState {
    employees: Employee[];
}
