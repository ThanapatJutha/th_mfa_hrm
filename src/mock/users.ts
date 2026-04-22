import type { AuthUser } from "@/features/auth/types/auth.types";

export const mockUsers: AuthUser[] = [
    {
        id: "user-001",
        name: "สมชาย บุญมี",
        role: "admin",
    },
    {
        id: "user-002",
        name: "สุดา แก้วใส",
        role: "employee",
        employeeId: "emp-003",
    },
];
