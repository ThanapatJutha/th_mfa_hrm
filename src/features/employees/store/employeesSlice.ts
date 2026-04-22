import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockEmployees } from "@/mock/employees";
import type { Employee, EmployeesState } from "@/features/employees/types/employee.types";

const initialState: EmployeesState = {
    employees: mockEmployees,
};

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee(state, action: PayloadAction<Employee>) {
            state.employees.push(action.payload);
        },
        updateEmployee(state, action: PayloadAction<Employee>) {
            const idx = state.employees.findIndex((e) => e.id === action.payload.id);
            if (idx !== -1) {
                state.employees[idx] = action.payload;
            }
        },
        deleteEmployee(state, action: PayloadAction<string>) {
            state.employees = state.employees.filter((e) => e.id !== action.payload);
        },
    },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
